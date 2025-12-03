import { petAPI } from '@/api/petApi';
import type { Pet } from '../interfaces/pet.interface';
import type { CreatePet } from '../interfaces/create-pet.interface';

export const createPetAction = async (pet: CreatePet): Promise<Pet> => {
  const { data } = await petAPI.post<Pet>('/pets', pet);

  return data;
};
