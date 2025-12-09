import { create } from 'zustand';
import type { VaccinationEventsResponse } from '../home/interfaces/vaccination-events.response';
import type { VaccineEvents } from '../home/interfaces/vaccination-events.interface';

interface VaccineState {
  // Estado: Todos los eventos de todas las mascotas
  eventsByPet: VaccinationEventsResponse[];
  events: VaccineEvents[];

  // Acción: Guardar los eventos que vienen de la API
  setEvents: (events: VaccinationEventsResponse[]) => void;

  // Utilidad: Obtener eventos filtrados por ID de mascota
  getEventsByPetId: (petId: number) => VaccineEvents[];
}

export const useVaccineStore = create<VaccineState>((set, get) => ({
  eventsByPet: [],
  events: [],

  setEvents: (eventsByPet) =>
    set({
      eventsByPet,

      events: eventsByPet.flatMap((item) =>
        item.vaccineEvents.map((event) => ({
          ...event,
          pet: item.pet,
        }))
      ),
    }),

  getEventsByPetId: (petId: number) => {
    const petData = get().eventsByPet.find((item) => item.pet.id === petId);
    return petData ? petData.vaccineEvents : [];
  },
}));
