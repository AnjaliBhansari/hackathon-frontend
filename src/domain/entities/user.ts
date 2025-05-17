export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}
