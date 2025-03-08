import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Search({ searchFn, searching }: {  searchFn: any; searching: boolean }) {
  const [query, setQuery] = useState("");

  return (
    <form onSubmit={() => searchFn(query)} className="flex gap-2 items-center w-full">
      <Input
        className="py-6 px-4 focus-visible:ring-sky-400 focus-visible:ring-1 focus-visible:outline-none focus-visible:border-0 rounded-lg"
        type="search"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a gig keyword..."
      />

      <Button type="submit" variant="default" className="bg-sky-400 text-white p-6">
        Find Gigs
      </Button>
    </form>
  );
}

export default Search;
