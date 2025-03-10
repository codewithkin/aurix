import puppeteer from 'puppeteer';
import fs from 'fs';

const results = []; // Store results in an array

const crawler = {
    isRunning: false,

    async run(requests) {
        this.isRunning = true;

        // Launch the browser
        const browser = await puppeteer.launch({
            headless: true,  // Set to 'false' for debugging
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.setCacheEnabled(false); // Disable cache

        // Process the requests
        for (const request of requests) {
            const { url, userData } = request;
            try {
                console.log(`Crawling: ${url}`);
                await page.goto(url, { waitUntil: 'domcontentloaded' });

                let scrapedJobs = [];

                if (userData.platform === "reddit") {
                    await page.waitForSelector(".w-full");
                    scrapedJobs = await page.$$eval(".w-full", (els) =>
                        els
                            .map((el) => {
                                if (el.textContent.toLowerCase().includes("[hiring]")) {
                                    return {
                                        platform: "reddit",
                                        title: el.querySelector(".text-neutral-content-strong")?.textContent?.trim() || "No title",
                                        description: el.querySelector(".feed-card-text-preview")?.textContent?.trim() || "No description",
                                        date: el.querySelectorAll(".whitespace-nowrap")?.[1]?.textContent?.trim() || "No date",
                                        url: `https://www.reddit.com${el.querySelector("a.absolute")?.getAttribute("href") || ""}`,
                                        username: el.closest("shreddit-post")?.getAttribute("author")?.replace("u/", "") || "No username",
                                    };
                                }
                            })
                            .filter(Boolean)
                    );
                }

                if (userData.platform === "upwork") {
                    await page.waitForSelector(".job-tile");
                    scrapedJobs = await page.$$eval(".job-tile", (els) =>
                        els.map((el) => {
                            const relativeUrl = el.querySelector(".air3-link")?.getAttribute("href") || "";
                            const absoluteUrl = relativeUrl.startsWith("/") ? `https://www.upwork.com${relativeUrl}` : relativeUrl;
                
                            return {
                                platform: "upwork",
                                url: absoluteUrl,
                                title: el.querySelector(".job-tile-title")?.textContent?.trim() || "No title",
                                description: el.querySelector(".text-body-sm")?.textContent?.trim() || "No description",
                                date: el.querySelector(".text-light")?.textContent?.trim() || "No date",
                            };
                        })
                    );
                }

                // Store results globally
                results.push(...scrapedJobs);
            } catch (error) {
                console.error(`Error while crawling ${url}:`, error);
            }
        }

        await browser.close();
        this.isRunning = false;
    }
};

export { crawler, results };
