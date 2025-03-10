import NextAuth from "next-auth";
import Reddit from "next-auth/providers/reddit";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend,
    Reddit
  ],
});
