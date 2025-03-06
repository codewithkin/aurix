import { PlaywrightCrawler } from "crawlee";

export default async function UpworkScraper(term = "webdeveloper") {
    const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
            try {
                console.log("UPWORK CRAWLER STARTING...");

                await page.waitForSelector(".job-tile");

                // Extract job details and pass to Node.js
                const jobs = await page.c$$eval(".job-tile", (els) => {
                    return els.map((el) => {
                        return {
                            title: el.querySelector(".job-tile-title").textContent,
                            description: el.querySelector(".text-body-sm").textContent,
                            date: el.querySelector(".text-light").textContent
                        }
                    });
                });

                return jobs;
            } catch (e) {
                console.log("UPWORK CRAWLER FAILED...", e);
            }
        }
    })

    await crawler.run([`https://www.upwork.com/nx/search/jobs/?from_recent_search=true&q=${term}`]);
}