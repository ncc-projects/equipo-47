import { useQuery } from '@tanstack/react-query';
import { getPetByIDAction } from '../actions/getPetByID.action';

export const useGetPetByID = (petId: string) => {
  return useQuery({
    queryKey: ['pet', { petId }],
    queryFn: () => getPetByIDAction(petId),
    staleTime: 1000 * 60 * 5,
  });
};
