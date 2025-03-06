import {Router} from "express";
import GetJobs from "../controllers/getJobs.js"

const router = Router();

// Create a get all jobs route
router.get("/jobs", GetJobs)
router.get("/job", (req, res) => res.send("Hi !"))

export default router;