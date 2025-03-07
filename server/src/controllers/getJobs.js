import RedditScraper from "../lib/scrapers/reddit.js";
import UpworkScraper from "../lib/scrapers/upwork.js";

export default async function GetJobs (req, res) {
    try {
        // Get the user's search query (if any);
        const {q} = req.query;
        const jobs = [];

        const redditJobs = await RedditScraper();
        const upworkJobs = await UpworkScraper();

        for (let job of [...redditJobs, ...upworkJobs]) {
            if (q) {
                if (job.title.toLowerCase().includes(q.toLowerCase())) {
                    jobs.push(job);
                }
            } else {
                jobs.push(job);
            }
        }

        return res.json(jobs);
    } catch (e) {
        console.log("An error occured while fetching jobs: ", e);
        res.status(500).json({
            message: "An error occured, check the server logs for more details"
        })
    }
}