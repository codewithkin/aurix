"use client";
import { useEffect, useState } from "react";
import Search from "./main/Search";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { urls } from "@/lib/urls";
import { Loader, Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

function MainContent({ jobs, fetching }: { jobs: any; fetching: boolean }) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All");

  const {
    mutate: search,
    isPending: loading,
    data: response,
  } = useMutation({
    mutationKey: ["search"],
    mutationFn: async () => {
      const res = (await axios.get(
        `${urls.backendUrl}/api/jobs?q=${query}`,
      )) as { data: { jobs?: any[] } };

      return res.data;
    },
  });

  // const handleFilterJobs = () {
  //   se
  // }

  // Filter the jobs based on the selected platform(s)
  // const filteredJobs = jobs.filter((job: any) => {
  //   return job.platform === "upwork" || job.platform === "reddit";
  // });

  const filteredJobs = (jobs ?? []).filter((job: any) => {
    return (
      platform === "All" ||
      job.platform.toLowerCase() === platform.toLowerCase()
    );
  });

  return (
    <article className="flex gap-8 justify-center w-full p-8">
      {/* Filters sidebar */}
      <aside className="w-1/4">
        <article className="rounded-2xl border border-gray-200">
          <article className="border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="font-semibold">Filters</h2>

            <Button
              type="submit"
              variant="outline"
              className="text-purple-600 border-purple-600 hover:text-purple-400 hover:border-purple-400 hover:bg-white"
            >
              Clear Filters
            </Button>
          </article>

          <article className="flex flex-col gap-8 justify-center p-4">
            {/* <article className="flex flex-col gap-2">
              <Label>Date Posted</Label>
              <Input type="date" />
            </article>

            <article className="flex flex-col gap-2">
              <Label>Price Range</Label>
              <Slider defaultValue={[0]} max={5000} step={10} />
            </article> */}

            <RadioGroup defaultValue="All" onValueChange={setPlatform}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="All" id="r1" />
                <Label htmlFor="r1">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Upwork" id="r2" />
                <Label htmlFor="r2">Upwork</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Reddit" id="r3" />
                <Label htmlFor="r3">Reddit</Label>
              </div>
            </RadioGroup>
          </article>
        </article>
      </aside>

      {/* Main content */}
      <main className="w-3/4">
        {fetching ? (
          <article className="w-full h-full flex flex-col">
            <article className="flex flex-col gap-2 w-full justify-center">
              <Skeleton className="w-20 h-6 rounded-lg" />
              <article className="flex gap-4 items-center w-full">
                <Skeleton className="w-full h-12 rounded-lg" />
                <Skeleton className="w-1/6 h-12 rounded-lg" />
              </article>
            </article>
          </article>
        ) : (
          <>
            <h3 className="text-2xl font-semibold">{jobs.length || 0} Results</h3>
            {/* <Search /> */}

            {/* Jobs Cards */}
            <article className="grid md:grid-cols-2 gap-4 my-4">
              {filteredJobs?.map(
                (job: any, index: number) =>
                  job && (
                    <Card key={index}>
                      <CardContent>
                        <CardHeader>
                          <article
                            className={`${
                              job.platform === "reddit"
                                ? "text-red-600"
                                : "text-green-600"
                            } flex gap-4 items-center font-semibold`}
                          >
                            <Image
                              alt={`${job.platform} logo`}
                              src={`/logos/${job.platform}.png`}
                              width={28}
                              height={28}
                            />
                            <h2 className="capitalize">{job.platform}</h2>
                          </article>
                          <Badge
                            variant="default"
                            className="bg-purple-600 text-white font-semibold w-fit text-xs rounded-full"
                          >
                            {job.date}
                          </Badge>
                          <CardTitle className="capitalize text-xl font-semibold">
                            {job.title}
                          </CardTitle>
                        </CardHeader>

                        <CardFooter>
                          <p className="text-slate-600 text-sm">
                            {job.description.slice(0, 500).concat("...")}
                          </p>
                        </CardFooter>
                      </CardContent>
                    </Card>
                  ),
              )}
            </article>
          </>
        )}
      </main>
    </article>
  );
}

export default MainContent;
