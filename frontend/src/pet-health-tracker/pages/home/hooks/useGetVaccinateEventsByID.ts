import { useQuery } from '@tanstack/react-query';
import { getVaccinateEventsByIDAction } from '../actions/getVaccinateEventsByID.action';

export const useGetVaccinateEventsByID = (vaccinateId: number) => {
  return useQuery({
    queryKey: ['vaccinate-events', { vaccinateId }],
    queryFn: () => getVaccinateEventsByIDAction(vaccinateId),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
