export interface PetResponse {
  name:      string | null;
  species:   string | null;
  breed:     string | null;
  birthDate: string | null;
  weight:    string | null;
  color:     string | null;
  feeding:   string | null;
  neutered:  boolean;
  notes:     string | null;
}