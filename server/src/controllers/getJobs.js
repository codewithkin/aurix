import RedditScraper from "../lib/scrapers/reddit.js";
import UpworkScraper from "../lib/scrapers/upwork.js";

export default async function GetJobs(req, res) {
    try {
        const { q } = req.query;
        const jobs = [];

        const [redditJobs, upworkJobs] = await Promise.all([
            RedditScraper(),
            UpworkScraper(q || "webdeveloper"),
        ]);

        const allJobs = [...redditJobs, ...upworkJobs];

        const filteredJobs = q
            ? allJobs.filter((job) => job.title.toLowerCase().includes(q.toLowerCase()))
            : allJobs;

        return res.json(filteredJobs);
    } catch (e) {
        console.error("An error occurred while fetching jobs:", e);
        res.status(500).json({ message: "An error occurred, check the server logs for details" });
    }
}
