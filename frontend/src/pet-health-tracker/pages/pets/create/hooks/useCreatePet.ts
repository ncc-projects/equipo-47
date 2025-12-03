import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPetAction } from '../actions/createPet.action';

export const useCreatePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPetAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
};
