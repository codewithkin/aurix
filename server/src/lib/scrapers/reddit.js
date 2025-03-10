import puppeteer from 'puppeteer';

export async function RedditScraper() {
    const browser = await puppeteer.launch({
        headless: true, // Set to false if you want to debug
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setCacheEnabled(false); // Disable cache

    const requests = [
        {
            url: "https://www.reddit.com/r/forhire/",
            userData: { platform: "reddit" },
        },
        {
            url: "https://www.reddit.com/r/freelance_forhire/",
            userData: { platform: "reddit" },
        }
    ];

    const results = [];

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

            // Store results globally (in this case, just add it to the results array)
            results.push(...scrapedJobs);
        } catch (error) {
            console.error(`Error while crawling ${url}:`, error);
        }
    }

    await browser.close();

    return results;
}
