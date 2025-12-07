import { petAPI } from '@/api/petApi';
import type { CreateVaccinateEvent } from '../interfaces/create-vaccinate-event';
import type { CreateVaccinationEventResponse } from '../interfaces/create-vaccinate-event.response';

export const createVaccinateEventAction = async (
  vaccinateEvent: CreateVaccinateEvent
): Promise<CreateVaccinationEventResponse> => {
  const { data } = await petAPI.post<CreateVaccinationEventResponse>(
    '/vaccination-events',
    vaccinateEvent
  );
  return data;
};
