"use server";

import { signIn } from "@/auth";

export async function redditSignIn() {
  await signIn("reddit", {redirect: true, redirectTo: "/"});
}

export async function emailSignIn(formData: FormData) {
  await signIn("resend", formData);
}