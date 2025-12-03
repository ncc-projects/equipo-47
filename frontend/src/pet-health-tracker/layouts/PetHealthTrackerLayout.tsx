import { Outlet } from 'react-router';
import { Footer } from '../components/footer/Footer';

const PetHealthTrackerLayout = () => {
  return (
    <main className='min-h-svh grid grid-rows-[1fr_auto] bg-background p-4'>
      <div className='pb-28'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default PetHealthTrackerLayout;
