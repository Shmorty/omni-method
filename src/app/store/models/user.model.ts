export interface Height {
  feet: number,
  inches: number,
}

export interface User {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    nickname?: string,
    avatar?: string,
    dob: Date,
    height?: Height,
    weight: number
  }