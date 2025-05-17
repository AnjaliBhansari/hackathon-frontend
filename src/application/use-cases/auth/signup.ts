import {
  AuthRepository,
  SignUpData,
} from "@/domain/repositories/auth-repository";
import { AuthResponse } from "@/domain/entities/user";

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: SignUpData): Promise<AuthResponse> {
    return this.authRepository.signup(data);
  }
}
