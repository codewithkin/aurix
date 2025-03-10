import { crawler, requestQueue, results } from "../lib/crawler.js";

export default async function GetJobs (req, res) {
    try {
        // TODO: Make the crawlers work for searches

        // Get the search query (if any)
        const {query} = req.query;

        console.log("LOG: Search query: ", query);

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
        ]

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
        ]

        // Conditionally add requests depending on whether or not a query has been given
        const requests = query ? requestsWithQuery : requestsWithNoQuery

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
        console.log("An error occured while fetching jobs: ", error);
        res.status(500).json({ message: "Error occurred while fetching jobs", error: error.message });
    }
};
