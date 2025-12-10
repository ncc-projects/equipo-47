import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { resetPasswordAction } from '../actions/resetPassword.action';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordAction,
    onSuccess: () => {
      toast.success('Contraseña restablecida, será redirigido en 3 segundos', {
        position: 'top-center',
        duration: 3000,
      });
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        error?: string[];
        message?: string;
      }>;

      let message = 'Error al restablecer la contraseña';
      if (axiosError.response?.data?.error) {
        message = Array.isArray(axiosError.response.data.error)
          ? axiosError.response.data.error.join(', ')
          : axiosError.response.data.error;
      } else if (axiosError.response?.data?.message) {
        message = axiosError.response.data.message;
      }

      toast.error(message, { position: 'top-center' });
    },
  });
};
