import { crawler, requestQueue, results } from "../lib/crawler.js";

let isCrawlerRunning = false; // Track crawler state

export default async function GetJobs(req, res) {
    try {
        const { query } = req.query;

        const requestsWithNoQuery = [
            { url: "https://www.reddit.com/r/forhire/", userData: { platform: "reddit" } },
            { url: "https://www.reddit.com/r/freelance_forhire/", userData: { platform: "reddit" } },
            { url: "https://www.upwork.com/nx/search/jobs/?q=webdeveloper", userData: { platform: "upwork" } }
        ];

        const requestsWithQuery = [
            { url: `https://www.reddit.com/r/forhire/search?q=${query}`, userData: { platform: "reddit" } },
            { url: `https://www.reddit.com/r/freelance_forhire/search?q=${query}`, userData: { platform: "reddit" } },
            { url: `https://www.upwork.com/nx/search/jobs/?q=${query}`, userData: { platform: "upwork" } }
        ];

        const requests = query ? requestsWithQuery : requestsWithNoQuery;

        // Add requests to queue
        for (const request of requests) {
            await requestQueue.addRequest(request);
        }

        // Run crawler only if not already running
        if (!isCrawlerRunning) {
            console.log("Starting centralized crawler...");
            isCrawlerRunning = true; // Set flag to prevent duplicate runs
            await crawler.run();
            isCrawlerRunning = false; // Reset flag after completion
        } else {
            console.log("Crawler is already running, new requests added.");
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("An error occurred while fetching jobs:", error);
        res.status(500).json({ message: "Error occurred while fetching jobs", error: error.message });
    }
};
