import type { Pet } from "./pets.interface";
import type { VaccineEvents } from "./vaccination-events.interface";

export interface VaccinationEventsResponse {
  pet:           Pet;
  vaccineEvents: VaccineEvents[];
}