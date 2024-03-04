export interface User {
  id: string;
  avatar?: string;
  categoryScore: object;
  dob: Date;
  email: string;
  firstName: string;
  gender?: string;
  lastName: string;
  nickname?: string;
  username: string;
  omniScore: number;
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
