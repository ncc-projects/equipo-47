import { useQuery } from '@tanstack/react-query';
import { getPetsAction } from '../actions/getPets.action';

export const useGetPets = () => {
  return useQuery({
    queryKey: ['pets'],
    queryFn: getPetsAction,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
