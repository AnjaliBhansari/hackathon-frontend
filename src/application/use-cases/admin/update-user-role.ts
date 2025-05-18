import { AdminRepository } from "@/domain/repositories/admin-repository";

export class UpdateUserRoleUseCase {
  constructor(private adminRepository: AdminRepository) {}

  async execute(memberId: number, role: string): Promise<void> {
    return this.adminRepository.updateUserRole(memberId, role);
  }
}
