import { petAPI } from '@/api/petApi';

interface Props {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const resetPasswordAction = async ({
  newPassword,
  token,
  confirmNewPassword,
}: Props): Promise<boolean> => {
  const { data } = await petAPI.post<boolean>('/users/renew-password', {
    token,
    newPassword,
    confirmNewPassword,
  });

  return data;
};
