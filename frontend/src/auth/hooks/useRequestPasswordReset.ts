import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { requestPasswordResetAction } from '../actions/requestPasswordReset.action';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordResetAction,
    onSuccess: () => {
      toast.success(
        'Código enviado exitosamente. Revisa tu correo electrónico, será redirigido en 5 segundos',
        {
          position: 'top-center',
          duration: 5000,
        }
      );
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        error?: string[];
        message?: string;
      }>;

      let message = 'Error cuenta no encontrada';
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
