"use server";

import { signIn } from "@/auth";

export async function redditSignIn() {
  await signIn("reddit");
}

export async function emailSignIn() {
  await signIn("resend");
}
