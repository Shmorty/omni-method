export interface User {
  id: string;
  avatar?: string;
  dob: Date;
  email: string;
  firstName: string;
  gender?: Gender;
  lastName: string;
  nickname?: string;
  username: string;
  height?: {
    feet: number;
    inches: number;
  };
  weight: number;
  omniScore: number;
  scoreDate: string;
  categoryScore: object;
  fitnessLevel?: string;
}

export type Gender = "Male" | "Female";

export interface AuthenticationUser {
  uid: string;
  email: string;
}
