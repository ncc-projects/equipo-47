export interface Pet {
  id:              number;
  name:            string;
  species:         string;
  breed:           string;
  gender:          GenderPet;
  birthDate:       string;
  weight:          number;
  color:           null | string;
  feeding:         string;
  neutered:        boolean;
  notes:           null | string;
  ownerId:         number;
  profileImageUrl: null | string;
}

export type GenderPet = 'MACHO' | 'HEMBRA'