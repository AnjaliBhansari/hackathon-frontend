import {
  AuthRepository,
  SignUpData,
} from "@/domain/repositories/auth-repository";
import { AuthResponse, UserCredentials } from "@/domain/entities/user";

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  }

  async signup(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );
    console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw { error: errorData.error || "Signup failed" };
    }

    return response.json();
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear local storage after successful logout
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}
