import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession } = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://api.better-auth.com",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
