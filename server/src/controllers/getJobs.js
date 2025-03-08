import { crawler, requestQueue, results } from "../lib/crawler.js";

export default async function GetJobs (req, res) {
    try {
        // Define job search requests
        const requests = [
            {
                url: "https://www.reddit.com/r/forhire/",
                userData: { platform: "reddit" },
            },
            {
                url: "https://www.reddit.com/r/freelance_forhire/",
                userData: { platform: "reddit" },
            },
            {
                url: "https://www.upwork.com/nx/search/jobs/?q=webdeveloper",
                userData: { platform: "upwork" },
            },
        ];

        // Add URLs to request queue
        for (const request of requests) {
            await requestQueue.addRequest(request);
        }

        // Run the crawler only if it's not already running
        if (!crawler.isRunning) {
            console.log("Starting centralized crawler...");
            await crawler.run();
        } else {
            console.log("Crawler is already running, new requests added.");
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error occurred while fetching jobs", error: error.message });
    }
};
