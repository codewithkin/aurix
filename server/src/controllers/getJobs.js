import UpworkScraper from "src/lib/scrapers/upwork.js";

export default function GetJobs (req, res) {
    // Create dummy jobs
    const jobs = [
        {
            name: "hello",
            createdAt: "Monday"
        }
    ]

    res.json(jobs);
}