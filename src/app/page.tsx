import React from 'react'

export default async function Home() {
  const jobs = await fetch("http://localhost:3000/api/jobs");

  console.log(jobs);

  return (
    <section></section>
  )
}