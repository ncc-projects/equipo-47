export interface CreateVaccinateTypeResponse {
  message: string;
  status:  number;
  data:    Data;
}

export interface Data {
  id:              number;
  name:            string;
  frequencyInDays: number;
  enabled:         boolean;
}
