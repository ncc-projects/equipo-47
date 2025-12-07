import { useQuery } from '@tanstack/react-query';
import { getVaccinateTypesAction } from '../actions/getVaccinateTypes.action';

export const useGetVaccinateTypes = () => {
  return useQuery({
    queryKey: ['vaccinate-types'],
    queryFn: getVaccinateTypesAction,
    staleTime: 1000 * 30,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
