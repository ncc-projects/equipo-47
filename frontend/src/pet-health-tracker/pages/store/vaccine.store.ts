import { create } from 'zustand';
import type { VaccinationEvents } from '../home/interfaces/vaccination-events.interface';

interface VaccineState {
  // Estado: Todos los eventos de todas las mascotas
  events: VaccinationEvents[];

  // Acción: Guardar los eventos que vienen de la API
  setEvents: (events: VaccinationEvents[]) => void;

  // Utilidad: Obtener eventos filtrados por ID de mascota
  getEventsByPetId: (petId: number) => VaccinationEvents[];
}

export const useVaccineStore = create<VaccineState>((set, get) => ({
  events: [],

  setEvents: (events) => set({ events }),

  getEventsByPetId: (petId) => {
    // Usamos get() para leer el estado actual dentro de la función
    return get().events.filter((event) => event.petId === petId);
  },
}));
