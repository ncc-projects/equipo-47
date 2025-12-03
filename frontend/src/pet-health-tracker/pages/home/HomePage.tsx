import { CardPets } from './components/cards/pet/CardPets';
import { CardProfile } from './components/cards/profile/CardProfile';
import { CardReminders } from './components/cards/reminder/CardReminders';
import { CardServices } from './components/cards/service/CardServices';

export const HomePage = () => {
  return (
    <div className='gap-4 flex flex-col'>
      <CardProfile name='María' />
      <CardPets />
      <CardReminders />
      <CardServices />
    </div>
  );
};
