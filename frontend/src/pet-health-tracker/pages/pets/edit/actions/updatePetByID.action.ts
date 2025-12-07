import { petAPI } from '@/api/petApi';
import type { UpdatePetForm } from '../schemas/updatePetSchema';
import type { Pet } from '@/pet-health-tracker/pages/home/interfaces/pets.interface';

interface Props {
  petId: string;
  pet: UpdatePetForm;
}

export const updatePetByIDAction = async ({
  pet,
  petId,
}: Props): Promise<Pet> => {
  const { profileImageUrl, ...petWithoutUrl } = pet;

  const formData = new FormData();
  formData.append('pet', JSON.stringify(petWithoutUrl));

  const { data } = await petAPI.put<Pet>(`/pets/${petId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
