import { petAPI } from '@/api/petApi';
import type { CheckStatusResponse } from '../interfaces/checkStatus.response';

export const checkAuthAction = async (): Promise<CheckStatusResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  try {
    const { data } = await petAPI.get<CheckStatusResponse>(
      '/users/check-status'
    );
    localStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    throw new Error('Token expired or not valid');
  }
};
