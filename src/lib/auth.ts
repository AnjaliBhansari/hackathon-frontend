import { betterAuth } from "better-auth";

export const auth = betterAuth({
  apiKey: process.env.BETTER_AUTH_API_KEY,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    // You can set default credentials for testing
    defaultCredentials: {
      email: "test@example.com",
      password: "password123",
    },
  },
  // Optional: Add social providers if needed
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

const API_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "https://harsh-hackathon-backend.onrender.com";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export async function loginWithProvider(provider: "google" | "apple") {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`${provider} login failed`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${provider} authentication failed`);
  }
}
