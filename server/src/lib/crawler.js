import { PlaywrightCrawler, RequestQueue } from "crawlee";

const requestQueue = await RequestQueue.open(); // Explicitly create a request queue

const crawler = new PlaywrightCrawler({
    requestQueue,
    maxConcurrency: 2,
    launchContext: {
        launchOptions: {
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
    },
    requestHandler: async ({ request, page }) => {
        try {
            console.log(`Crawling: ${request.url}`);

            if (request.userData.platform === "reddit") {
                await page.waitForSelector(".w-full");
                const gigs = await page.$$eval(".w-full", (els) =>
                    els
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
                        .filter(Boolean)
                );
                requestQueue.results.push(...gigs);
            }

            if (request.userData.platform === "upwork") {
                await page.waitForSelector(".job-tile");
                const jobs = await page.$$eval(".job-tile", (els) =>
                    els.map((el) => ({
                        platform: "upwork",
                        title: el.querySelector(".job-tile-title")?.textContent?.trim() || "No title",
                        description: el.querySelector(".text-body-sm")?.textContent?.trim() || "No description",
                        date: el.querySelector(".text-light")?.textContent?.trim() || "No date",
                    }))
                );
                requestQueue.results.push(...jobs);
            }
        } catch (error) {
            console.error(`Error while crawling ${request.url}:`, error);
        } finally {
            await page.close();
        }
    },
});

export default crawler;
export { requestQueue };