"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ErrorPage({ error, reset }: { error: { message: string }, reset: () => void }) {

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold">Ooops</h2>
        <p className="text-slate-600 text-lg">An error occured, please try again later</p>
        <p className="bg-gray-900 hover:cursor-pointer border-2 border-purple-600 rounded-md my-2 text-white py-2 px-8 hover:border-orange-600 hover:shadow-sm transitino duration-500">
            {error.message}
        </p>
        <article className="flex md:flex-row flex-col gap-4 items-center justify-center w-full">
            <Button onClick={reset} className="bg-purple-600 text-white font-semibold" variant="default">
                Reload
            </Button>
            <Button asChild className="border-2 border-gray-600 font-semibold text-gray-600 hover:text-gray-900 hover:border-gray-900" variant="outline">
                <Link href="emailto:kin@aurix.space">
                    Contact Support
                </Link>
            </Button>
        </article>
    </section>
  )
}

export default ErrorPage
