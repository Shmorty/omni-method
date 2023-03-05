export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  gender?: string;
  avatar?: string;
  dob: Date;
  height?: {
    feet: number;
    inches: number;
  };
  weight: number;
}

export interface AuthenticationUser {
  uid: string;
  email: string;
}
