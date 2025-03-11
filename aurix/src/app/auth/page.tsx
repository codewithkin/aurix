"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailSignIn, redditSignIn } from "@/lib/actions";
import Image from "next/image";

function page() {
  return (
    <section className="bg-gradient-to-tr from-sky-200 to-blue-500 min-h-screen min-w-screen flex flex-col justify-center items-center">
      {/* Form */}
      <article className="bg-transparent bg-white p-8 border-2 border-purple-600 flex flex-col gap-2 rounded-xl w-fit h-fit text-center">
        <article className="text-center flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Welcome Back
          </h2>
          <p className="text-slate-600">Let's get you signed in</p>
        </article>

        <form className="flex flex-col gap-4 my-4" action={emailSignIn}>
          <article className="flex flex-col justify-start text-start gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email"
              placeholder="kin@aurix.space"
              name="email"
              id="email"
              required
            />
          </article>

          <Button className="p-4" type="submit">
            Sign in
          </Button>
        </form>

        <h2 className="text-slate-600 text-lg">Or</h2>

        <form
          className="flex flex-col justify-center items-center"
          action={redditSignIn}
        >
          <Button
            className="border-red-500 border text-red-500 font-medium hover:text-white rounded-full hover:border-0 hover:bg-red-500 transition duration-300 w-full p-4"
            variant="outline"
            type="submit"
          >
            <Image
              width={24}
              height={24}
              className="rounded-full"
              alt="Reddit icon"
              src="/logos/reddit.png"
            />
            Sign in with reddit
          </Button>
        </form>
      </article>
    </section>
  );
}

export default page;
