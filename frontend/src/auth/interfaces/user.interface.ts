export interface User {
  id:       number;
  fullName: string;
  email:    string;
  enabled:  boolean;
  roles:    Role[];
}

export interface Role {
  id:      number;
  name:    string;
  enabled: boolean;
}
