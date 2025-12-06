export interface VaccinationEvents {
  id:             number;
  petId:          number;
  vaccineType:    VaccineType;
  eventType:      string;
  scheduledDate:  string;
  appliedDate:    string | null;
  nextDueDate:    string | null;
  createdAt:      string;
  expirationDate: string;
  hasReminder:    boolean;
  traceId:        string;
  enabled:        boolean;
}

export interface VaccineType {
  id:              number;
  name:            string;
  frequencyInDays: number;
  enabled:         boolean;
}
