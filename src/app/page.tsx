'use client';

import { useEffect, useState } from 'react';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Latest Freelance Jobs</h1>
          <Button 
            onClick={() => fetchJobs()} 
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh Jobs'}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No jobs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            asChild
          >
            <a href="/jobs">View All Jobs with Filters →</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
