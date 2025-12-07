import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVaccinateEventAction } from '../actions/createVaccinateEvent.action';

export const useCreateVaccinateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVaccinateEventAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccinate-events'] });
      queryClient.invalidateQueries({ queryKey: ['vaccinate-types'] });
    },
  });
};
