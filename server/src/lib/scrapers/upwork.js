import { PlaywrightCrawler } from "crawlee";

export default async function UpworkScraper(term = "webdeveloper") {
    const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
            try {
                console.log("UPWORK CRAWLER STARTING...");

                await page.waitForSelector(".job-tile");

                const jobs = [];

                // Extract job details and pass to Node.js
                await page.$$eval(".job-tile-title", (els) => {
                    return els.map((el) => {
                        jobs.push({title: el.textContent})
                    });
                });

                console.log("Extracted Jobs:", jobs);
            } catch (e) {
                console.log("UPWORK CRAWLER FAILED...", e);
            }
        }
    })

    await crawler.run([`https://www.upwork.com/nx/search/jobs/?from_recent_search=true&q=${term}`]);
}