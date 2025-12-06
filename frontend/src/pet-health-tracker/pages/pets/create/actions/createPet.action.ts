import { petAPI } from '@/api/petApi';
import type { CreatePet } from '../interfaces/create-pet.interface';
import type { Pet } from '@/pet-health-tracker/pages/home/interfaces/pets.interface';

interface CreatePetActionProps {
  data: CreatePet;
  image?: File | null;
}

export const createPetAction = async ({
  data,
  image,
}: CreatePetActionProps): Promise<Pet> => {
  try {
    const formData = new FormData();

    formData.append('pet', JSON.stringify(data));

    if (image) {
      formData.append('profileImage', image);
    }

    const { data: pet } = await petAPI.post('/pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return pet;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};
