import { useForm } from 'react-hook-form';
import type { Register } from './interfaces/register.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './schema/registerSchema';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useRegisterUser } from './hooks/useRegisterUser';
import { Header } from '@/components/Header';

export const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate } = useRegisterUser();

  const onSubmit = (formData: Register) => {
    mutate(formData);
  };

  return (
    <section className='w-full max-w-md flex flex-col gap-4 justify-center'>
      <Header
        img='/src/assets/pets.png'
        title='Empezamos?'
        titleClass='font-medium text-xl'
        imgClass='w-37 h-37'
      />
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center'>
        <fieldset className='flex flex-col w-full gap-8 *:w-full *:relative'>
          <label htmlFor='fullName'>
            <span className='absolute -top-2.5 left-5 bg-white px-1.5 text-xs'>
              Nombre Completo
            </span>
            <input
              type='text'
              id='fullName'
              className='border-2 border-primary rounded-lg w-full h-12 p-4 text-xs'
              placeholder='Juana Molina'
              {...register('fullName', { required: true })}
            />
            {errors && (
              <span className='text-red-500 text-sm'>
                {errors.fullName?.message}
              </span>
            )}
          </label>
          <label htmlFor='email'>
            <span className='absolute -top-2.5 left-5 bg-white px-1.5 text-xs'>
              Correo electrónico
            </span>
            <input
              type='email'
              id='email'
              placeholder='email@gmail.com'
              autoComplete='username'
              className='border-2 border-primary rounded-lg w-full h-12 p-4 text-xs'
              {...register('email')}
            />
            {errors && (
              <span className='text-red-500 text-sm'>
                {errors.email?.message}
              </span>
            )}
          </label>
          <label htmlFor='password'>
            <span className='absolute -top-2.5 left-5 bg-white px-1.5 text-xs'>
              Contraseña
            </span>
            <input
              type='password'
              id='password'
              placeholder='***********'
              autoComplete='new-password'
              className='border-2 border-primary rounded-lg w-full h-12 p-4 text-xs'
              {...register('password')}
            />
            {errors && (
              <span className='text-red-500 text-sm'>
                {errors.password?.message}
              </span>
            )}
          </label>
          <label htmlFor='confirm-password'>
            <span className='absolute -top-2.5 left-5 bg-white px-1.5 text-xs'>
              Confirmar Contraseña
            </span>
            <input
              type='password'
              id='confirm-password'
              placeholder='***********'
              autoComplete='new-password'
              className='border-2 border-primary rounded-lg w-full h-12 p-4 text-xs'
              {...register('confirmPassword')}
            />
            {errors && (
              <span className='text-red-500 text-sm'>
                {errors.confirmPassword?.message}
              </span>
            )}
          </label>

          <button
            type='submit'
            className='bg-primary h-13 rounded-lg text-xl font-medium'
          >
            Crear Cuenta
          </button>
        </fieldset>
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
