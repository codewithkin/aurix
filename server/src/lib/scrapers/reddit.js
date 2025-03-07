import { PlaywrightCrawler } from "crawlee";

export default async function RedditScraper() {
    const results = [];

    const crawler = new PlaywrightCrawler({
        // Use memory storage
        storage: ":memory:",
        maxConcurrency: 2,
        launchContext: {
            launchOptions: {
                headless: true, // Saves RAM
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            },
        },
        requestHandler: async ({ page }) => {
            try {
                console.log("REDDIT CRAWLER STARTING...");
                await page.waitForSelector(".w-full");

                const gigs = await page.$$eval(".w-full", (els) => {
                    return els
                        .map((el) => {
                            if (el.textContent.toLowerCase().includes("[hiring]")) {
                                return {
                                    platform: "reddit",
                                    title: el.querySelector(".text-neutral-content-strong")?.textContent?.trim() || "No title",
                                    description: el.querySelector(".feed-card-text-preview")?.textContent?.trim() || "No description",
                                    date: el.querySelectorAll(".whitespace-nowrap")?.[1]?.textContent?.trim() || "No date",
                                };
                            }
                        })
                        .filter(Boolean);
                });

                results.push(...gigs);
            } catch (e) {
                console.error("REDDIT CRAWLER FAILED:", e);
            } finally {
                await page.close()
            }
        },
    });

    await crawler.run([
        "https://www.reddit.com/r/forhire/",
        "https://www.reddit.com/r/freelance_forhire/",
    ]);

    return results;
}
