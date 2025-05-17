import { AuthResponse, UserCredentials } from "../entities/user";

export interface AuthRepository {
  login(credentials: UserCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
}
