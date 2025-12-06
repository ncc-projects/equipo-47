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

  // 1. Obtenemos la función para guardar en el store
  const setEvents = useVaccineStore((state) => state.setEvents);

  const { data: pets = [], isLoading } = useGetPets();
  const petsId = pets.map((pet) => pet.id);

  const { data: vaccinateEvents = [] } = useGetVaccinateEvents(petsId);

  // 2. EFECTO DE SINCRONIZACIÓN
  // Cuando la API responda con datos, los guardamos en el store global.
  useEffect(() => {
    if (vaccinateEvents.length > 0) {
      setEvents(vaccinateEvents);
    }
  }, [vaccinateEvents, setEvents]);

  return (
    <div className='gap-4 flex flex-col'>
      <CardProfile name={user?.fullName || ''} />
      {isLoading ? <PetSkeleton /> : <CardPets pets={pets} />}
      <CardReminders vaccinateEvents={vaccinateEvents} />
      <CardServices />
    </div>
  );
};
