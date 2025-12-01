import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/Header';
import type { Login } from './interfaces/login.interface';
import { loginSchema } from './schemas/loginSchema';
import { useAuthStore } from '@/auth/store/auth.store';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const onSubmit = async (formData: Login) => {
    setIsPosting(true);
    const email = formData.email;
    const password = formData.password;

    const isValid = await login(email, password);

    if (isValid) {
      navigate('/');
      return;
    }

    toast.error('Correo o/y contraseña no válidos', { position: 'top-center' });
    setIsPosting(false);
  };

  const passwordValue = useWatch({
    control,
    name: 'password',
  });

  return (
    <section className='w-full max-w-md flex flex-col justify-between h-[calc(100svh-48px)]'>
      <section className='gap-6 flex flex-col'>
        <Header
          img='/src/assets/pets.png'
          title='Pet Health Tracker'
          imgClass='w-52 h-52'
        />
        <section className='text-center'>
          <h4 className='text-3xl'>Inicia sesión</h4>
          <p className='text-xl px-10'>
            Accede para seguir cuidando la salud de tus mascotas
          </p>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
          <div className='flex flex-col w-full gap-6'>
            <div>
              <fieldset
                className={`border-2 rounded-lg w-full transition-colors ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-primary focus-within:border-primary'
                }`}
              >
                <legend className='ml-3 px-1 text-xs font-semibold'>
                  Correo electrónico
                </legend>
                <input
                  type='email'
                  id='email'
                  placeholder='email@gmail.com'
                  autoComplete='username'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                  {...register('email')}
                />
              </fieldset>
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {errors.email?.message}
                </span>
              )}
            </div>

            {/* </label> */}
            <div className='relative'>
              <fieldset
                className={`border-2 rounded-lg w-full transition-colors ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-primary focus-within:border-primary'
                }`}
              >
                <legend className='ml-3 px-1 text-xs font-semibold'>
                  Contraseña
                </legend>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='contraseña'
                  autoComplete='new-password'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                  {...register('password')}
                />
                {passwordValue && passwordValue.length > 0 && (
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='cursor-pointer absolute top-4 right-3 focus:outline-none py-2'
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FaEye size={18} strokeWidth={1.75} />
                    ) : (
                      <FaEyeSlash size={18} strokeWidth={1.75} />
                    )}
                  </button>
                )}
              </fieldset>

              {errors.password && (
                <span className='text-red-500 text-sm'>
                  {errors.password?.message}
                </span>
              )}
            </div>

            <section className='flex flex-col gap-3'>
              <button
                type='submit'
                className='bg-primary h-13 rounded-lg text-xl font-medium'
                disabled={isPosting}
              >
                Iniciar Sesión
              </button>
              <span className='text-xl text-center'>
                Olvidaste tu contraseña?
              </span>
            </section>
          </div>
        </form>
      </section>
      <section>
        <hr className='mx-4 text-gray-300 border' />
        <section className='flex justify-center items-center w-full'>
          <h3 className='text-center text-xl'>No tienes cuenta?</h3>&nbsp;
          <a className='text-center text-xl font-bold' href='#'>
            Crear cuenta
          </a>
        </section>
      </section>
    </section>
  );
};
