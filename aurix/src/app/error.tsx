"use client";

import { Button } from "@/components/ui/button";

function ErrorPage({ error, reset }: { error: { message: string }, reset: () => void }) {


  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold">Ooops</h2>
        <p className="text-slate-600 text-lg">An error occured, please try again later</p>
        <p className="bg-gray-400 border-2 border-purple-600 rounded-sm my-2">
            {error.message}
        </p>
        <Button onClick={reset} className="bg-purple-600 text-white font-semibold" variant="default">
            Reload
        </Button>
    </section>
  )
}

export default ErrorPage
