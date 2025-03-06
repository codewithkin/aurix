import { PlaywrightCrawler } from "crawlee";

export default function upworkCrawler() {
    const crawler = new PlaywrightCrawler({
        requestHandler: async ({ page }) => {
            console.log("STARTING CRAWLER");

            // Wait for the actor cards to render.
            await page.waitForSelector('.job-tile');
    
            const titles = await page.$$eval('.job-tile', (els) => {
                console.log(els);

                // Extract text content from the actor cards
                return els.map((el) => el.textContent || '');
            });

            console.log("CRAWLER FINISHED");
        },
    });
    
    crawler.run(['https://www.upwork.com/nx/search/jobs/?from_recent_search=true&q=web%20developer']);
}

upworkCrawler();