'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job, JobFilters } from '@/types/job';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>({});
  
  const platforms = ['Upwork', 'AngelList', 'WeWorkRemotely', 'IndieHackers', 'YC'];
  const commonTechStack = ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript'];

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            onValueChange={(value) => handleFilterChange('platform', [value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map(platform => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange('techStack', [value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Tech Stack" />
            </SelectTrigger>
            <SelectContent>
              {commonTechStack.map(tech => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Min Budget"
            onChange={(e) => handleFilterChange('budgetMin', parseInt(e.target.value))}
          />

          <Input
            type="text"
            placeholder="Search Keywords"
            onChange={(e) => handleFilterChange('keywords', e.target.value.split(' '))}
          />
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-4">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
} 