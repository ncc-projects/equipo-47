import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestPasswordResetSchema } from '../schema/requestPasswordResetSchema';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useRequestPasswordReset } from '@/auth/hooks/useRequestPasswordReset';
import { Header } from '@/components/Header';
import { CustomTextField } from '@/components/custom/CustomTextField';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

interface RequestPasswordResetForms {
  email: string;
}

export const RequestPasswordResetForm = () => {
  const form = useForm<RequestPasswordResetForms>({
    resolver: zodResolver(requestPasswordResetSchema),
  });

  const { handleSubmit, control } = form;

  const { mutate, isPending } = useRequestPasswordReset();
  const navigate = useNavigate();

  const [isSent, setIsSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const onSubmit = (formData: RequestPasswordResetForms) => {
    if (isSent || cooldown > 0 || isPending) return;

    const email = formData.email;

    mutate(email, {
      onSuccess: () => {
        setIsSent(true);
        setTimeout(() => {
          navigate('/');
        }, 5000);
      },
      onError: () => {
        setCooldown(3);
      },
    });
  };

  const isDisabled = isPending || isSent || cooldown > 0;

  return (
    <div>
      <Header
        img='/src/assets/auth/request.png'
        title='Recuperar contraseña'
        titleClass='text-xl font-medium'
        description='Ingresá el email con el que te registraste y te enviaremos un enlace para restablecer tu contraseña.'
        descriptionClass='text-center text-base!'
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <CustomTextField
            control={control}
            label='Email'
            name='email'
            placeholder='email@gmail.com'
          />

          <Button
            variant='primary'
            type='submit'
            disabled={isDisabled}
            className='w-full'
          >
            {isPending ? (
              <>
                <Spinner /> Enviando...
              </>
            ) : isSent ? (
              'Código enviado'
            ) : cooldown > 0 ? (
              `Reintentar en ${cooldown}s`
            ) : (
              'Enviar Enlace'
            )}
          </Button>
        </form>
      </Form>

      <p className='text-xs text-muted-foreground text-center mt-2'>
        <Link className='underline hover:text-foreground' to='/'>
          Volver al inicio
        </Link>
      </p>
    </div>
  );
};
