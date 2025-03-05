import React from "react";
import Search from "./main/Search";
import { Button } from "./ui/button";

function MainContent() {
  return (
    <article className="flex gap-2 items-center w-full p-8">
      {/* Filters sidebar */}
      <aside className="w-1/4">
        <article className="rounded-md border border-gray-200">
          <article className="border-b border-gray-200 p-4 flex justify-between items-center">
            <h2 className="font-semibold">Filters</h2>

            <Button type="submit" variant="outline" className="text-purple-600 border-purple-600 hover:text-purple-400 hover:border-purple-400 hover:bg-white">
              Clear Filters
            </Button>
          </article>

          <article className="flex flex-col gap-8 items-center p-4">
            <article>
              <Label>Date Posted</Label>
              <Calender />
            </article>

            <article>
              
            </article>
          </article>
        </article>
      </aside>

      {/* Main content */}
      <main className="w-3/4">
            <Search />
      </main>
    </article>
  );
}

export default MainContent;
