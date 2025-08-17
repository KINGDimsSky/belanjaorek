import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Perluas tipe JWT dengan properti kustom Anda
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

// Perluas tipe Session dan User
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // <-- Gabungkan dengan tipe default
  }

  interface User {
    role: string;
  }
}