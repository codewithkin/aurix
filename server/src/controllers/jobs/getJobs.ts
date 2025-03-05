import type { Request, Response } from "express";
import { Job, JobsResponse } from "../../types/job";

export default async function getJobs(req: Request, res: Response<JobsResponse>) {
  try {
    // Dummy jobs
    const jobs: Job[] = [
      {
        name: "Hi",
        platform: "upwork"
      }
    ];

    res.json({ jobs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ jobs: [], message: errorMessage });
  }
}