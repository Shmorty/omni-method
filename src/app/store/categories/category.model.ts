import { Assessment } from '../assessments/assessment.model';

export interface Category {
  // id: number;
  cid: string;
  seq?: number;
  label: string;
  categoryAverage?: number;
  assessments?: Assessment[];
}
