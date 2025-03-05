"use state";
import { useState } from "react";
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

function MainContent() {
  const results = 10;

  const [query, setQuery] = useState("");

  const { mutate: search, isPending: loading } = useMutation({
    mutationKey: ["search"],
    mutationFn: async () => {
      const res = await axios.get(`${urls.backendUrl}/api/jobs?q=${query}`) as {data: {jobs?: any[]}};
    }
  })

  return (
    <article className="flex gap-8 justify-center w-full p-8">
      {/* Filters sidebar */}
      <aside className="w-1/4">
        <article className="rounded-2xl border border-gray-200">
          <article className="border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="font-semibold">Filters</h2>

            <Button type="submit" variant="outline" className="text-purple-600 border-purple-600 hover:text-purple-400 hover:border-purple-400 hover:bg-white">
              Clear Filters
            </Button>
          </article>

          <article className="flex flex-col gap-8 justify-center p-4">
            <article className="flex flex-col gap-2">
              <Label>Date Posted</Label>
              <Input type="date" />
            </article>

            <article className="flex flex-col gap-2">
              <Label>Price Range</Label>
              <Slider defaultValue={[0]} max={5000} step={10} />
            </article>

            <article className="flex flex-col gap-2">
              <Label>Platforms</Label>
              <article className="flex gap-4 items-center">
                <article className="flex gap-2 items-center">
                  <Checkbox name="upwork" id="upwork" />
                  <Label>Upwork</Label>
                </article>

                <article className="flex gap-2 items-center">
                  <Checkbox name="angellist" id="angellist" />
                  <Label>AngelList</Label>
                </article>

                <article className="flex gap-2 items-center">
                  <Checkbox name="contra" id="contra" />
                  <Label>Contra</Label>
                </article>

                <article className="flex gap-2 items-center">
                  <Checkbox name="fiverr" id="fiverr" />
                  <Label>Fiverr</Label>
                </article>
              </article>
            </article>
          </article>
        </article>
      </aside>

      {/* Main content */}
      <main className="w-3/4">
        <h3 className="text-xl">{results} Results</h3>
        <Search />
      </main>
    </article>
  );
}

export default MainContent;
