import type { User } from "./user.interface";

export interface CheckStatusResponse {
  userResponseDTO: User;
  token:           string;
}
