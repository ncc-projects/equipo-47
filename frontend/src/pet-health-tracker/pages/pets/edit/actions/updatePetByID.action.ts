import { petAPI } from '@/api/petApi';
import type { Pet } from '../../create/interfaces/pet.interface';
import type { UpdatePetAPI } from '../schemas/updatePetSchema';

interface Props {
  petId: string;
  pet: UpdatePetAPI;
}

export const updatePetByIDAction = async ({
  pet,
  petId,
}: Props): Promise<Pet> => {
  const { data } = await petAPI.put<Pet>(`/pets/${petId}`, pet);
  return data;
};
