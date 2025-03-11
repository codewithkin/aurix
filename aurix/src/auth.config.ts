import type { NextAuthConfig } from "next-auth"
import Reddit from "next-auth/providers/reddit";
import Resend from "next-auth/providers/resend";

export default {
    providers: [Resend, Reddit],
} satisfies NextAuthConfig;