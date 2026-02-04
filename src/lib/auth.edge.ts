import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-compatible auth config for middleware
 * This config doesn't use any Node.js-specific modules
 */
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      // Credentials validation happens in the main auth.ts, not here
      // This is just a placeholder for the middleware
      async authorize() {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
} satisfies NextAuthConfig;
