/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

// Extend the built-in session type with our custom user object type (from Prisma) to include id and other fields (name, email, etc.)
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}
