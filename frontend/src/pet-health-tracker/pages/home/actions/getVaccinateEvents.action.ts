import { petAPI } from '@/api/petApi';
import type { VaccinationEventsResponse } from '../interfaces/vaccination-events.response';

export const getVaccinateEventsAction =
  async (): Promise<VaccinationEventsResponse[]> => {
    const { data } = await petAPI.get<VaccinationEventsResponse[]>(
      '/vaccination-events'
    );
    return data;
  };
