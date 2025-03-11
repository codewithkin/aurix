import type { NextAuthConfig } from "next-auth"
import Reddit from "next-auth/providers/reddit"
import Resend from "next-auth/providers/resend"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Resend, Reddit],
} satisfies NextAuthConfig