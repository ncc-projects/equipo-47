import { useAuthStore } from '@/auth/store/auth.store';
import { CardPets } from './components/cards/pet/CardPets';
import { CardProfile } from './components/cards/profile/CardProfile';
import { CardReminders } from './components/cards/reminder/CardReminders';
import { CardServices } from './components/cards/service/CardServices';
import { useGetPets } from './hooks/useGetPets';
import { PetSkeleton } from './components/skeletons/PetSkeleton';
import { useGetVaccinateEvents } from './hooks/useGetVaccinateEvents';

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  const { data: pets = [], isLoading } = useGetPets();
  const petsId = pets.map((pet) => pet.id);

  const { data: vaccinateEvents = [] } = useGetVaccinateEvents(petsId);

  return (
    <div className='gap-4 flex flex-col'>
      <CardProfile name={user?.fullName || ''} />
      {isLoading ? <PetSkeleton /> : <CardPets pets={pets} />}
      <CardReminders vaccinateEvents={vaccinateEvents} />
      <CardServices />
    </div>
  );
};
