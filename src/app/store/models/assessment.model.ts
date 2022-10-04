import { Score } from "./score.model";

export interface Assessment {
    id: number;
    icon: string;
    label: string;
    description?: string;
    units?: string;
    scores?: Score[];
  }