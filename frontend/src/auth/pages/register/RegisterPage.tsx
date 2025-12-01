import { useForm, useWatch } from 'react-hook-form';
import type { Register } from './interfaces/register.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './schema/registerSchema';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { useAuthStore } from '@/auth/store/auth.store';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: Register) => {
    setIsLoading(true);
    const isValid = await registerUser(formData);

    if (isValid) {
      navigate('/');
      return;
    }

    toast.error('No se pudo crear un usuario con estos datos');

    setIsLoading(false);
  };

  const passwordValue = useWatch({
    control,
    name: 'password',
  });

  const confirmPasswordValue = useWatch({
    control,
    name: 'confirmPassword',
  });

  return (
    <section className='w-full max-w-md flex flex-col gap-4 justify-center'>
      <Header
        img='/src/assets/pets.png'
        title='Empezamos?'
        titleClass='font-medium text-xl'
        imgClass='w-37 h-37'
      />
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
        <div className='flex flex-col w-full gap-6'>
          <div>
            <fieldset
              className={`border-2 rounded-lg w-full transition-colors ${
                errors.fullName
                  ? 'border-red-500'
                  : 'border-primary focus-within:border-primary'
              }`}
            >
              <legend className='ml-3 px-1.5 text-xs'>Nombre Completo</legend>
              <input
                type='text'
                id='fullName'
                className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                placeholder='Juana Molina'
                {...register('fullName', { required: true })}
              />
            </fieldset>

            {errors.fullName && (
              <span className='text-red-500 text-sm'>
                {errors.fullName?.message}
              </span>
            )}
          </div>

          <div>
            <fieldset
              className={`border-2 rounded-lg w-full transition-colors ${
                errors.email
                  ? 'border-red-500'
                  : 'border-primary focus-within:border-primary'
              }`}
            >
              <legend className='ml-3 px-1.5 text-xs'>
                Correo electrónico
              </legend>
              <input
                type='email'
                id='email'
                placeholder='email@gmail.com'
                autoComplete='username'
                className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                {...register('email', { required: true })}
              />
            </fieldset>

            {errors.email && (
              <span className='text-red-500 text-sm'>
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className='relative'>
            <fieldset
              className={`border-2 rounded-lg w-full transition-colors ${
                errors.password
                  ? 'border-red-500'
                  : 'border-primary focus-within:border-primary'
              }`}
            >
              <legend className='ml-3 px-1.5 text-xs'>Contraseña</legend>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='***********'
                autoComplete='new-password'
                className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                {...register('password', { required: true })}
              />
              {passwordValue?.length > 0 && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='cursor-pointer absolute top-4 right-3 focus:outline-none py-2'
                  tabIndex={-1}
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? (
                    <FaEye size={18} strokeWidth={1.75} />
                  ) : (
                    <FaEyeSlash size={18} strokeWidth={1.75} />
                  )}
                </button>
              )}
            </fieldset>
            {passwordValue && (
              <ul className='text-xs mt-1 text-muted-foreground'>
                <li
                  className={
                    passwordValue.length >= 8
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  • Mínimo 8 caracteres
                </li>
                <li
                  className={
                    /[A-Z]/.test(passwordValue)
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  • Una mayúscula
                </li>
                <li
                  className={
                    /\d/.test(passwordValue) ? 'text-green-500' : 'text-red-500'
                  }
                >
                  • Un número
                </li>
                <li
                  className={
                    /[^A-Za-z0-9]/.test(passwordValue)
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  • Al menos un carácter especial (por ejemplo: ! @ # $ % ^ & *)
                </li>
              </ul>
            )}
          </div>
          <div className='relative'>
            <fieldset
              className={`border-2 rounded-lg w-full transition-colors ${
                errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-primary focus-within:border-primary'
              }`}
            >
              <legend className='ml-3 px-1.5 text-xs'>
                Confirmar Contraseña
              </legend>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirm-password'
                placeholder='***********'
                autoComplete='new-password'
                className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                {...register('confirmPassword', { required: true })}
              />
            </fieldset>
            {confirmPasswordValue?.length > 0 && (
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='cursor-pointer absolute top-4 right-3 focus:outline-none py-2'
                tabIndex={-1}
                aria-label={
                  showConfirmPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                {showConfirmPassword ? (
                  <FaEye size={18} strokeWidth={1.75} />
                ) : (
                  <FaEyeSlash size={18} strokeWidth={1.75} />
                )}
              </button>
            )}

            {errors.confirmPassword && (
              <span className='text-red-500 text-sm'>
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>

          <button
            type='submit'
            className='bg-primary h-13 rounded-lg text-xl font-medium'
            disabled={isLoading}
          >
            Crear Cuenta
          </button>
        </div>
      </form>
      <section className='flex justify-center items-center w-full'>
        <hr className='flex-1 mx-4 text-gray-300 border' />
        <span className='text-xl'>O</span>
        <hr className='flex-1 mx-4 text-gray-300 border' />
      </section>
      <section>
        <h3 className='text-center text-xl'>Inicia sesión con</h3>
        <div className='flex items-center justify-center gap-17 mt-10'>
          <FaFacebook className='w-10 h-10 text-secondary' />
          <FaGoogle className='w-10 h-10 text-secondary' />
        </div>
      </section>
    </section>
  );
};
