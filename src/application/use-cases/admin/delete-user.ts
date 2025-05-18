import { AdminRepository } from "@/domain/repositories/admin-repository";

export class DeleteUserUseCase {
  constructor(private adminRepository: AdminRepository) {}

  async execute(userId: number): Promise<void> {
    return this.adminRepository.deleteUser(userId);
  }
}
