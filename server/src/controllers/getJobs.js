import { RedditScraper } from "../lib/scrapers/reddit.js";
import { UpworkScraper } from "../lib/scrapers/upwork.js";

export default async function GetJobs(req, res) {
    try {
        // Prevent caching
        res.setHeader('Cache-Control', 'no-store');

        // Get the search query (if any)
        const { query } = req.query;

        console.log("LOG: Search query: ", query);

        // Clear previous results to avoid old data being included in new search results
        results.length = 0;

        const requests = [];

        if (!query) {
            // Add default requests for Reddit and Upwork if no query
            requests.push(...await UpworkScraper());
            requests.push(...await UpworkScraper());
        } else {
            // Add requests for Reddit and Upwork with the query
            requests.push(...await RedditScraper(query));
            requests.push(...await UpworkScraper(query));
        }

        console.log("LOG: Requests: ", requests);

        res.status(200).json(requests);
    } catch (error) {
        console.log("An error occurred while fetching jobs: ", error);
        res.status(500).json({ message: "Error occurred while fetching jobs", error: error.message });
    }
}