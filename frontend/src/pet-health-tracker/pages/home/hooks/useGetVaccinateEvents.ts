import { useQuery } from '@tanstack/react-query';
import { getVaccinateEventsAction } from '../actions/getVaccinateEvents.action';

export const useGetVaccinateEvents = (petIds: number[]) => {
  return useQuery({
    queryKey: ['vaccinate-events', { petIds }],
    // queryFn: () => getVaccinateEventsAction(petIds),
    queryFn: async () => {
      const results = await Promise.all(
        petIds.map((id) => getVaccinateEventsAction(id))
      );

      // results = array de arrays → lo aplanamos
      return results.flat();
    },
    enabled: petIds.length > 0,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
