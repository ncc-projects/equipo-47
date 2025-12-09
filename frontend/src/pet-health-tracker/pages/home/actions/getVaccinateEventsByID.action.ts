import { petAPI } from '@/api/petApi';
import type { VaccineEvents } from '../interfaces/vaccination-events.interface';

export const getVaccinateEventsByIDAction = async (
  petId: number
): Promise<VaccineEvents[]> => {
  const { data } = await petAPI.get<VaccineEvents[]>(
    `/vaccination-events/${petId}/reminders`
  );
  return data;
};
