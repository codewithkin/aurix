import { Job } from "@/types/job";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
          <Badge variant="secondary">{job.platform}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
        {job.budget && (
          <p className="mt-4 text-sm text-gray-500">
            Budget: {job.budget.currency}
            {job.budget.min} - {job.budget.max}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-gray-500">
          Posted: {new Date(job.postedAt).toLocaleDateString()}
        </span>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          View Job →
        </a>
      </CardFooter>
    </Card>
  );
}
