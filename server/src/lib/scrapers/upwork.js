import { PlaywrightCrawler } from "crawlee";

export default async function UpworkScraper(term = "webdeveloper") {
    let res;

    const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
            try {
                console.log("UPWORK CRAWLER STARTING...");

                await page.waitForSelector(".job-tile");

                // Extract job details and pass to Node.js
                const jobs = await page.$$eval(".job-tile", (els) => {
                    return els.map((el) => {
                        return {
                            title: el.querySelector(".job-tile-title").textContent,
                            description: el.querySelector(".text-body-sm").textContent.replace(/\s+/g, ' ').trim(),
                            date: el.querySelector(".text-light").textContent
                        }
                    });
                });

                res = jobs;

                // Return the scraped jobs
                return jobs;
            } catch (e) {
                console.log("UPWORK CRAWLER FAILED...", e);
                return []; // Return an empty array on failure
            }
        }
    })

    // Run the crawler and capture the results
    await crawler.run([`https://www.upwork.com/nx/search/jobs/?from_recent_search=true&q=${term}`]);

    console.log(res);

    return res;
}