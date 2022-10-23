import { Assessment } from './assessment.model';

export interface Category {
  id: number;
  cid?: string | number;
  seq?: number;
  label: string;
  categoryAverage?: number;
  assessments?: Assessment[];
}
