import { petAPI } from '@/api/petApi';
import type { VaccinateTypes } from '../interfaces/vaccinate-types.interface';

export const getVaccinateTypesAction = async (): Promise<VaccinateTypes[]> => {
  const { data } = await petAPI.get<VaccinateTypes[]>('/vaccine-types');
  return data;
};
