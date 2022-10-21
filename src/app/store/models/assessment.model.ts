import { Score } from './score.model';

export interface Assessment {
  id: number;
  aid?: string | number;
  cid?: string | number;
  icon: string;
  label: string;
  description?: string;
  units?: string;
  scores?: Score[];
}
