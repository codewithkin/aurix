import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Search() {
  return (
    <article className="flex gap-2 items-center w-full">
      <Input
        className="py-6 px-4 focus-visible:ring-sky-400 focus-visible:ring-1 focus-visible:outline-none focus-visible:border-0 rounded-lg"
        type="search"
        placeholder="Search for a gig keyword..."
      />

      <Button variant="default" className="bg-sky-400 text-white p-6">
        Find Gigs
      </Button>
    </article>
  );
}

export default Search;
