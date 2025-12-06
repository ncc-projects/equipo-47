import type { GenderPet } from "@/pet-health-tracker/pages/home/interfaces/pets.interface";

export interface CreatePet {
  name:            string;
  species:         string;
  breed:           string;
  gender:          GenderPet;
  birthDate:       string;
  weight:          number;
  color:           string;
  feeding:         string;
  neutered:        boolean;
  notes:           string;
}
