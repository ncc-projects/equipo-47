export interface Pet {
  name:      string | null;
  species:   string | null;
  breed:     string | null;
  gender:    GenderPet;
  birthDate: string | null;
  weight:    number | null;
  color:     string | null;
  feeding:   string | null;
  neutered:  boolean;
  notes:     string | null;
}

export type GenderPet = 'female' | 'male'