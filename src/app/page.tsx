import Topbar from '@/components/shared/Topbar';
import React from 'react'

export default async function Home() {
  const jobs = await fetch("http://localhost:3000/api/jobs");

  console.log(jobs);

  return (
    <>
    <Topbar />

    {/* Header */}
    <article className='px-4 py-8 border-y bg-slate-300 border-slate-600'>
      <article>
        <h2 className='font-semibold text-3xl'>Explore gigs across <span className="text-sky-700">the entire internet</span></h2>
        <p className="text-lg text-gray-600">
          Discover freelance gigs from top platforms like Upwork, AngelList, and Fiverr, all in one place. Whether you're a web developer, designer, or marketer, find opportunities that match your skills and interests. Start exploring today and take the next step in your freelance career.
        </p>
      </article>
    </article>

    article.flex.gap-8.items-center.justify-between
    </>
  )
}