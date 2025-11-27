import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <main className='min-h-svh flex items-center justify-center p-6'>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
