import UpworkScraper from "../lib/scrapers/upwork.js";

export default async function GetJobs (req, res) {
    try {
        // Get the user's search query (if any);
        const {q} = req.query;

        if(q) {
            // Create dummy jobs
            const jobs = await UpworkScraper(q);

            return res.json(jobs);
        }

        // Create dummy jobs
        const jobs = await UpworkScraper();

        return res.json(jobs);
    } catch (e) {
        console.log("An error occured while fetching jobs: ", e);
        res.status(500).json({
            message: "An error occured, check the server logs for more details"
        })
    }
}