import NextAuth from "next-auth";
import Reddit from "next-auth/providers/reddit";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [
    Resend,
    Reddit
  ],
});
