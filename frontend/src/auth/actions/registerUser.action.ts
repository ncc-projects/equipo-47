import { petAPI } from '@/api/petApi';
import type { Register } from '../pages/register/interfaces/register.interface';
import type { RegisterResponse } from '../pages/register/interfaces/register.response';

export const registerUserAction = async ({
  email,
  fullName,
  password,
}: Register): Promise<RegisterResponse> => {
  const { data } = await petAPI.post<RegisterResponse>('/users/register', {
    fullName,
    email,
    password,
  });

  return data;
};
