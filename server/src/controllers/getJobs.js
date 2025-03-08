import crawler, { requestQueue } from "../lib/crawler.js";
import {RedditScraper} from "../lib/scrapers/reddit.js";
import {UpworkScraper} from "../lib/scrapers/upwork.js";

export default async function GetJobs(req, res) {
    try {
        const { q } = req.query;

        // Queue all requests (Reddit & Upwork)
        await Promise.all([RedditScraper(), UpworkScraper(q)]);

        // Run the crawler on all queued jobs
        await crawler.run();

        // Retrieve results after crawling
        const jobs = requestQueue.results || [];
        const filteredJobs = q
            ? jobs.filter((job) => job.title.toLowerCase().includes(q.toLowerCase()))
            : jobs;

        return res.json(filteredJobs);
    } catch (e) {
        console.error("An error occurred while fetching jobs:", e);
        res.status(500).json({ message: "An error occurred, check the server logs for details" });
    }
}
