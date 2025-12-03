import { petAPI } from '@/api/petApi';
import type { Pet } from '../../create/interfaces/pet.interface';

export const getPetByIDAction = async (petId: string): Promise<Pet> => {
  const { data } = await petAPI.get(`/pets/${petId}`);

  return data;
};
