import { petAPI } from '@/api/petApi';
import type { PetResponse } from '../interfaces/pet.response';
import type { CreatePet } from '../interfaces/create-pet.interface';

export const createPetAction = async (
  pet: CreatePet
): Promise<PetResponse> => {
  const { data } = await petAPI.post<PetResponse>('/pets', pet);

  return data;
};
