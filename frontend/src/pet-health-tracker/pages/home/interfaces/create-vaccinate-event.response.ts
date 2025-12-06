export interface CreateVaccinationEventResponse {
  message: string;
  status:  number;
  data:    Data;
}

export interface Data {
  id:             number;
  petId:          number;
  vaccineType:    VaccineType;
  eventType:      string;
  scheduledDate:  string | null;
  appliedDate:    string;
  nextDueDate:    string;
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
