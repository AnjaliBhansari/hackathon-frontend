import { AuthRepository } from "@/domain/repositories/auth-repository";
import { AuthResponse, UserCredentials } from "@/domain/entities/user";

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  }

  async logout(): Promise<void> {
    localStorage.removeItem("userInfo");
  }
}
