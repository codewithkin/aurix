import crawler, { requestQueue } from "../crawler.js";

export async function UpworkScraper(term = "webdeveloper") {
    await requestQueue.addRequest({
        url: `https://www.upwork.com/nx/search/jobs/?q=${term}`,
        userData: { platform: "upwork" },
    });
}
