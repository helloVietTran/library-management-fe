import { User } from "@/types/types";

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
