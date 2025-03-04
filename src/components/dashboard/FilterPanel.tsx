'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterPanel() {
  return (
    <div className="w-80 border-l p-6 hidden lg:block">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Filters</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Budget Range</Label>
              <div className="flex items-center gap-4">
                <Input type="number" placeholder="Min" className="w-24" />
                <span>-</span>
                <Input type="number" placeholder="Max" className="w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Platform</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="angellist">AngelList</SelectItem>
                  <SelectItem value="weworkremotely">WeWorkRemotely</SelectItem>
                  <SelectItem value="indiehackers">Indie Hackers</SelectItem>
                  <SelectItem value="yc">YC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="node">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Smart Insights</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium mb-2">Trending Skills</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">React</Button>
                <Button variant="secondary" size="sm">TypeScript</Button>
                <Button variant="secondary" size="sm">Node.js</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 