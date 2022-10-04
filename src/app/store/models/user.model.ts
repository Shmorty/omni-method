
export interface User {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    nickname?: string,
    avatar?: string,
    dob: Date,
    height?: {
      feet: number,
      inches: number,
    },
    weight: number
  }