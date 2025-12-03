import { petAPI } from '@/api/petApi';

export const deletePetByIDAction = async (petId: string) => {
  const { data } = await petAPI.delete(`/pests/${petId}`);

  return data;
};
