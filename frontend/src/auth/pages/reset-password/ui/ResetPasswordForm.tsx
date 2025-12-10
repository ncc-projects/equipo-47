import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { resetPasswordSchema } from '../schema/resetPasswordSchema';
import { useResetPassword } from '@/auth/hooks/useResetPassword';
import { Header } from '@/components/Header';
import { CustomTextField } from '@/components/custom/CustomTextField';
import { Form } from '@/components/ui/form';

interface ResetPasswordForms {
  token: string;
  'new-password': string;
  'new-password-confirmation': string;
}

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();

  const [isSent, setIsSent] = useState(false);

  const token = searchParams.get('token') || '';

  const form = useForm<ResetPasswordForms>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
    },
  });

  const { handleSubmit, control } = form;

  const { mutate, isPending } = useResetPassword();

  const navigate = useNavigate();

  const onSubmit = async (formData: ResetPasswordForms) => {
    if (isSent || isPending) return;

    const newPassword = formData['new-password'];
    const confirmNewPassword = formData['new-password-confirmation'];

    mutate(
      { token, confirmNewPassword, newPassword },
      {
        onSuccess: () => {
          setIsSent(true);

          setTimeout(() => {
            navigate('/');
          }, 3000);
        },
      }
    );
  };

  const watchPassword = useWatch({
    control,
    name: 'new-password',
  });

  const isDisabled = isPending || isSent;

  return (
    <div className='w-full'>
      <Header
        img='/src/assets/auth/reset-password.png'
        title='Restablecer contraseña'
        titleClass='font-medium text-xl'
      />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-6 mt-10'
        >
          <CustomTextField
            control={control}
            name='new-password'
            label='Nueva contraseña'
            placeholder='Nueva contraseña'
          />
          {watchPassword && (
            <ul className='text-xs mt-1 text-muted-foreground'>
              <li
                className={
                  watchPassword.length >= 8 ? 'text-green-500' : 'text-red-500'
                }
              >
                • Mínimo 8 caracteres
              </li>
              <li
                className={
                  /[A-Z]/.test(watchPassword)
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                • Una mayúscula
              </li>
              <li
                className={
                  /\d/.test(watchPassword) ? 'text-green-500' : 'text-red-500'
                }
              >
                • Un número
              </li>
              <li
                className={
                  /[^A-Za-z0-9]/.test(watchPassword)
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                • Al menos un carácter especial (por ejemplo: ! @ # $ % ^ & *)
              </li>
            </ul>
          )}

          <CustomTextField
            control={control}
            name='new-password-confirmation'
            label='Confirmar nueva contraseña'
            placeholder='Confirmar Nueva contraseña'
          />

          <Button variant='primary' type='submit' disabled={isDisabled}>
            {isPending ? (
              <>
                <Spinner /> Restableciendo...
              </>
            ) : isSent ? (
              'Restablecido'
            ) : (
              'Restablecer'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
