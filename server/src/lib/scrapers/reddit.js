import { PlaywrightCrawler } from "crawlee";

export default async function RedditScraper() {
    let res = [];

    const crawler = new PlaywrightCrawler({
        // launchContext: {
        //     launchOptions: {
        //         proxy: {
        //             server: "http://173.211.0.148:6641",
        //             username: "qfuvxtfm",
        //             password: "k5244vgnipsu"
        //         }
        //     }
        // },
        requestHandler: async ({ page }) => {
            try {
                console.log("REDDIT CRAWLER STARTING...");

                await page.waitForSelector(".w-full");

                // Extract job details and pass to Node.js
                const gigs = await page.$$eval(".w-full", (els) => {
                    return els.map((el) => {
                        // Look for elements with textContent that contains the word [Hiring] (case insentivive)
                        if(el.textContent.toLowerCase().includes("[hiring]")) {
                            return {
                                platform: "reddit",
                                title: el.querySelector(".text-neutral-content-strong").textContent.replace(/\s+/g, ' ').trim(),
                                description: el.querySelector(".feed-card-text-preview").textContent.replace(/\s+/g, ' ').trim(),
                                date: el.querySelectorAll(".whitespace-nowrap")[1].textContent.replace(/\s+/g, ' ').trim(),
                            }
                        }
                    });
                });

                res = gigs;

                // Return the scraped gigs
                return gigs;
            } catch (e) {
                console.log("REDDIT CRAWLER FAILED...", e);
                return []; 
            }
        }
    })

    if(res.length < 1) {
        // Run the crawler and capture the results
        await crawler.run([`https://www.reddit.com/r/forhire/`]);

        console.log(res);
    }

    await crawler.run([`https://www.reddit.com/r/forhire/`]);

    return res;
}

RedditScraper();