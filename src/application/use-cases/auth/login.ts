import { AuthRepository } from "@/domain/repositories/auth-repository";
import { AuthResponse, UserCredentials } from "@/domain/entities/user";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(credentials: UserCredentials): Promise<AuthResponse> {
    return this.authRepository.login(credentials);
  }
}
