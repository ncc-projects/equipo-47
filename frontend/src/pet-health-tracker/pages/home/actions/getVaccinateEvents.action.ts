import { petAPI } from '@/api/petApi';
import type { VaccinationEvents } from '../interfaces/vaccination-events.interface';

export const getVaccinateEventsAction = async (
  petId: number
): Promise<VaccinationEvents[]> => {
  const { data } = await petAPI.get<VaccinationEvents[]>(
    `/vaccination-events/${petId}/reminders`
  );
  return data;
};
