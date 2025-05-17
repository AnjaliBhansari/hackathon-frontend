import { ProfileRepository } from "@/domain/repositories/profile-repository";

export interface ProfileData {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  receivedKudos: Array<{
    id: number;
    userId: number;
    creatorName: string;
    creatorImageUrl: string | null;
    receiverName: string;
    receiverImageUrl: string | null;
    createdByUserId: number;
    teamName: string;
    category: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
  createdKudos: Array<{
    id: number;
    userId: number;
    creatorName: string;
    creatorImageUrl: string | null;
    receiverName: string;
    receiverImageUrl: string | null;
    createdByUserId: number;
    teamName: string;
    category: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
}

export class GetProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(): Promise<ProfileData> {
    return this.profileRepository.getProfile();
  }
}
