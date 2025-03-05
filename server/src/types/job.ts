export interface Job {
    name: string;
    platform: string;
    // Add more job properties as needed
}

export interface JobsResponse {
    jobs: Job[];
}
