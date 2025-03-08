import crawler, { requestQueue } from "../crawler.js";

export async function RedditScraper() {
    await requestQueue.addRequest({
        url: "https://www.reddit.com/r/forhire/",
        userData: { platform: "reddit" },
    });

    await requestQueue.addRequest({
        url: "https://www.reddit.com/r/freelance_forhire/",
        userData: { platform: "reddit" },
    });
}
