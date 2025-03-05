import { Router } from "express";
import getJobs from "../controllers/jobs/getJobs";

const router = Router();

router.get("/jobs", getJobs);

export default router;