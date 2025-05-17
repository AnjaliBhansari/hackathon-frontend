import { ProfileData } from "@/application/use-cases/profile/get-profile";

export interface ProfileRepository {
  getProfile(): Promise<ProfileData>;
}
