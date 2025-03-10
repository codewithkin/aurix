import puppeteer from 'puppeteer';

export async function UpworkScraper(term = "webdeveloper") {
    const browser = await puppeteer.launch({
        headless: true, // Set to false if you want to debug
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setCacheEnabled(false); // Disable cache

    const request = {
        url: `https://www.upwork.com/nx/search/jobs/?q=${term}`,
        userData: { platform: "upwork" },
    };

    const results = [];

    try {
        console.log(`Crawling: ${request.url}`);
        await page.goto(request.url, { waitUntil: 'domcontentloaded' });

        let scrapedJobs = [];

        if (request.userData.platform === "upwork") {
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

        // Store results globally (in this case, just add it to the results array)
        results.push(...scrapedJobs);
    } catch (error) {
        console.error(`Error while crawling ${request.url}:`, error);
    }

    await browser.close();

    return results;
}
