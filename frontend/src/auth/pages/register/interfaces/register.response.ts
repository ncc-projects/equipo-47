export interface RegisterResponse {
  message: string;
  status:  number;
  data:    Data;
}

export interface Data {
  userResponseDTO: UserResponseDTO;
  token:           string;
}

export interface UserResponseDTO {
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
