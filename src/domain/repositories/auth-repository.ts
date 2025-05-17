import { AuthResponse, UserCredentials } from "../entities/user";

export interface SignUpData extends UserCredentials {
  name: string;
  role?: string;
}

export interface AuthRepository {
  login(credentials: UserCredentials): Promise<AuthResponse>;
  signup(data: SignUpData): Promise<AuthResponse>;
  logout(): Promise<void>;
}
