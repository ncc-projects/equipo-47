import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePetByIDAction } from '../actions/updatePetByID.action';
import type { Pet } from '../../create/interfaces/pet.interface';

export const useUpdatePetByID = (petId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePetByIDAction,
    onSuccess: (pet: Pet) => {
      queryClient.setQueryData(['pet', { petId }], pet);

      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
};
