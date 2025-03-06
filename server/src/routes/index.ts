import express from "express";
import getJobs from "../controllers/jobs/getJobs";

const router = express

router.get("/jobs", getJobs);

export default router;