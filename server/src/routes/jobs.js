import {Router} from "express";
import GetJobs from "src/controllers/getJobs.js";

const router = Router();

// Create a get all jobs route
router.get("/jobs", GetJobs)

export default router;