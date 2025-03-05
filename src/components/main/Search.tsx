import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function Search() {
  return (
    <article className="flex gap-2 items-center w-full">
      <Input 
        className='p-6 focus-visible:ring-sky-400 focus-visible:ring-1 focus-visible:outline-none focus-visible:border-0 rounded-lg'
        type='search'
      />

      <Button variant="default" className='bg-sky-400 text-white p-6'>
        Search
      </Button>
    </article>
  )
}

export default Search;
