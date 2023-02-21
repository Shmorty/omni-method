import { Score } from '../models/score.model';

export interface Assessment {
  id: number;
  aid?: string;
  cid?: string;
  icon: string;
  label: string;
  description?: string;
  checklist?: boolean;
  min: number;
  max: number;
  units?: string;
  scores?: Score[];
}
