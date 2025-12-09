import type { Pet } from "./pets.interface";

export interface VaccineEvents {
  id:             number;
  pet:            Pet | null;
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
