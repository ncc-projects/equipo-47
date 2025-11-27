import { Outlet } from 'react-router';

const PetHealthTrackerLayout = () => {
  return (
    <main className='min-h-svh flex items-center justify-center p-6 bg-background'>
      <Outlet />
    </main>
  );
};

export default PetHealthTrackerLayout;
