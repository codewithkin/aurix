import type { Request, Response } from "express";

export default async function getJobs(req: Request, res: Response) {
  try {
    // Dummy hobs
    const jobs = [
        {
            name: "Hi",
            platform: "upwork"
        }
    ]

    res.json({ jobs });
  } catch (error: unknown) {
    res.status(500).json({ message: "An errpr occured" });
  }
}