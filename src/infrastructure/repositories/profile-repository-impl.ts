import { ProfileRepository } from "@/domain/repositories/profile-repository";
import { ProfileData } from "@/application/use-cases/profile/get-profile";

export class ProfileRepositoryImpl implements ProfileRepository {
  async getProfile(): Promise<ProfileData> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return response.json();
  }
}
