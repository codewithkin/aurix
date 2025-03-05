import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function Search() {
  return (
    <article className="flex gap-2 items-center w-full">
      <Input 
        className='p-4 m-4 focus-visible:ring-sky-400 focus-visible:ring-1 focus-visible:outline-none focus-visible:border-0'
        type='search'
      />

      <Button variant="default" className='bg-sky-700 text-white'>
        Search
      </Button>
    </article>
  )
}

export default Search;
