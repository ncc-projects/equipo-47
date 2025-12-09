import { useAuthStore } from '@/auth/store/auth.store';
import { CardPets } from './components/cards/pet/CardPets';
import { CardProfile } from './components/cards/profile/CardProfile';
import { CardReminders } from './components/cards/reminder/CardReminders';
import { CardServices } from './components/cards/service/CardServices';
import { useGetPets } from './hooks/useGetPets';
import { PetSkeleton } from './components/skeletons/PetSkeleton';
import { useGetVaccinateEvents } from './hooks/useGetVaccinateEvents';
import { useVaccineStore } from '../store/vaccine.store';
import { useEffect } from 'react';

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  const setEvents = useVaccineStore((state) => state.setEvents);
  const vaccineEvents = useVaccineStore((state) => state.events);

  const { data: pets = [], isLoading } = useGetPets();

  const { data: vaccinateResponse = [] } = useGetVaccinateEvents();

  useEffect(() => {
    if (vaccinateResponse.length > 0) {
      setEvents(vaccinateResponse);
    }
  }, [vaccinateResponse, setEvents]);

  return (
    <div className='gap-4 flex flex-col'>
      <CardProfile name={user?.fullName || ''} />
      {isLoading ? <PetSkeleton /> : <CardPets pets={pets} />}
      <CardReminders vaccinateEvents={vaccineEvents} />
      <CardServices />
    </div>
  );
};
