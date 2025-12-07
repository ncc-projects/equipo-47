export interface CreateVaccinateEvent {
  petId:          number;
  vaccineTypeId:  number;
  date:           string;
  expirationDate: string;
  hasReminder:    boolean;
}
