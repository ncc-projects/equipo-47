import { petAPI } from '@/api/petApi';

export const requestPasswordResetAction = async (
  email: string
): Promise<boolean> => {
  const { data } = await petAPI.post<boolean>(
    '/users/request-password-renewal',
    {},
    { params: { email } }
  );

  return data;
};
