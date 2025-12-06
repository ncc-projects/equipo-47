import { petAPI } from '@/api/petApi';
import type { Pet } from '@/pet-health-tracker/pages/home/interfaces/pets.interface';

export const getPetByIDAction = async (petId: string): Promise<Pet> => {
  const { data } = await petAPI.get(`/pets/${petId}`);

  return data;
};
