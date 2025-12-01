import { petAPI } from '@/api/petApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await petAPI.post<AuthResponse>('/login', {
    email,
    password,
  });

  return data;
};
