import { Score } from './score.model';

export interface Assessment {
  id: number;
  aid?: string;
  cid?: string;
  icon: string;
  label: string;
  description?: string;
  min: number;
  max: number;
  units?: string;
  scores?: Score[];
}
