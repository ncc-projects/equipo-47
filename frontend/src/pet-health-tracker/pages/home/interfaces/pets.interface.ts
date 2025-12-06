export interface Pet {
  id:              number;
  name:            null | string;
  species:         null | string;
  breed:           null | string;
  gender:          GenderPet;
  birthDate:       string | null;
  weight:          number | null;
  color:           null | string;
  feeding:         null | string;
  neutered:        boolean;
  notes:           null | string;
  ownerId:         number;
  profileImageUrl: null | string;
}

export type GenderPet = 'MACHO' | 'HEMBRA'