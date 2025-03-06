import { PlaywrightCrawler } from "crawlee";

export async function getContentFromSelector(el, selector, content) {
    return el.querySelector(selector)[content];
}

export default async function UpworkScraper(term = "webdeveloper") {
    const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
            try {
                console.log("UPWORK CRAWLER STARTING...");

                await page.waitForSelector(".job-tile");

                // Extract job details and pass to Node.js
                const jobs = await page.$$eval(".job-tile", (els) => {
                    return els.map((el) => {
                        return {
                            title: getContentFromSelector(el, "job-tile-title", "textContent")
                        }
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