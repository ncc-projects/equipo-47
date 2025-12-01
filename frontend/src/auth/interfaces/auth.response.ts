import type { User } from "./user.interface";

export interface AuthResponse {
  token: Token;
  user:  User;
}

export interface Token {
  jwtToken: string;
}
