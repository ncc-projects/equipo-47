import { petAPI } from '@/api/petApi';
import type { UpdatePetAPI } from '../schemas/updatePetSchema';
import type { Pet } from '@/pet-health-tracker/pages/home/interfaces/pets.interface';

interface Props {
  petId: string;
  pet: UpdatePetAPI;
}

export const updatePetByIDAction = async ({
  pet,
  petId,
}: Props): Promise<Pet> => {
  const formData = new FormData();
  formData.append('pet', JSON.stringify(pet));

  // if (image) formData.append('profileImage', image);

  const { data } = await petAPI.put<Pet>(`/pets/${petId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
