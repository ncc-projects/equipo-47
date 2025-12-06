import { petAPI } from '@/api/petApi';
import type { Pet } from '../interfaces/pets.interface';

export const getPetsAction = async (): Promise<Pet[]> => {
  const { data } = await petAPI.get<Pet[]>('/pets');

  return data;
};
