import { crawler, requestQueue, results } from "../lib/crawler.js";
import fs from "fs";

export default async function GetJobs(req, res) {
    try {
        // Prevent caching
        res.setHeader('Cache-Control', 'no-store');

        // Get the search query (if any)
        const { query } = req.query;

        console.log("LOG: Search query: ", query);

        // Clear previous results to avoid old data being included in new search results
        results.length = 0;

        const requestsWithNoQuery = [
            {
                url: "https://www.reddit.com/r/forhire/",
                userData: { platform: "reddit" },
            },
            {
                url: "https://www.reddit.com/r/freelance_forhire/",
                userData: { platform: "reddit" },
            },
            {
                url: "https://www.upwork.com/nx/search/jobs/",
                userData: { platform: "upwork" },
            }
        ];

        const requestsWithQuery = [
            {
                url: `https://www.reddit.com/r/forhire/search?q=${query}`,
                userData: { platform: "reddit" },
            },
            {
                url: `https://www.reddit.com/r/freelance_forhire/search?q=${query}`,
                userData: { platform: "reddit" },
            },
            {
                url: `https://www.upwork.com/nx/search/jobs/?q=${query}`,
                userData: { platform: "upwork" },
            }
        ];

        if(query) {
            // Delete the storage folder to disable caching
            fs.rmSync("../../storage", { recursive: true, force: true });

            console.log("deleted storage folder")
        }

        // Conditionally add requests depending on whether or not a query has been given
        const requests = query ? requestsWithQuery : requestsWithNoQuery;

        console.log("LOG: Requests: ", requests);

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
        console.log("An error occurred while fetching jobs: ", error);
        res.status(500).json({ message: "Error occurred while fetching jobs", error: error.message });
    }
}