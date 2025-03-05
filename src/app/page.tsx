import MainContent from "@/components/MainContent";
import Topbar from "@/components/shared/Topbar";
import React from "react";

export default async function Home() {
  return (
    <>
      <Topbar />

      {/* Header */}
      <article className="p-16 border-y bg-gray-100 border-slate-300">
        <article className="flex flex-col gap-4 justify-center md:max-w-6xl">
          <h2 className="font-semibold text-3xl">
            Explore gigs across{" "}
            <span className="text-sky-400">the entire internet</span>
          </h2>
          <p className="text-lg text-gray-600">
            Discover freelance gigs from top platforms like Upwork, AngelList,
            and Fiverr, all in one place. Whether you're a web developer,
            designer, or marketer, find opportunities that match your skills and
            interests. Start exploring today and take the next step in your
            freelance career.
          </p>
        </article>
      </article>

      <MainContent />
    </>
  );
}
