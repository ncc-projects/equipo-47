import { CardPets } from './components/CardPets';
import { CardProfile } from './components/CardProfile';
import { CardReminders } from './components/CardReminders';

export const HomePage = () => {
  return (
    <div className='p-4 gap-4 flex flex-col'>
      <CardProfile name='María' />
      <CardPets />
      <CardReminders />
    </div>
  );
};
