import { useQuery } from '@tanstack/react-query';
import { getVaccinateEventsAction } from '../actions/getVaccinateEvents.action';

export const useGetVaccinateEvents = () => {
  return useQuery({
    queryKey: ['vaccinate-events'],
    queryFn: getVaccinateEventsAction,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
