import { PlaywrightCrawler } from "crawlee";

export default async function UpworkScraper(term = "webdeveloper") {
    const results = [];

    const crawler = new PlaywrightCrawler({
        storage,
        maxConcurrency: 2,
        launchContext: {
            launchOptions: {
                headless: true, // Saves RAM
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
        },
        requestHandler: async ({ page }) => {
            try {
                console.log("UPWORK CRAWLER STARTING...");
                await page.waitForSelector(".job-tile");

                const jobs = await page.$$eval(".job-tile", (els) => {
                    return els.map((el) => ({
                        platform: "upwork",
                        title: el.querySelector(".job-tile-title")?.textContent?.trim() || "No title",
                        description: el.querySelector(".text-body-sm")?.textContent?.trim() || "No description",
                        date: el.querySelector(".text-light")?.textContent?.trim() || "No date",
                    }));
                });

                results.push(...jobs);
            } catch (e) {
                console.error("UPWORK CRAWLER FAILED:", e);
            }
        },
    });

    await crawler.run([`https://www.upwork.com/nx/search/jobs/?q=${term}`]);
    return results;
}
