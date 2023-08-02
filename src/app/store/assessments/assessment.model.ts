import {Score} from '../models/score.model';

export interface Assessment {
  id: number;
  aid?: string;
  cid?: string;
  icon: string;
  label: string;
  description?: string;
  instruction?: string[];
  rules?: string[];
  checklist?: boolean;
  min: number;
  max: number;
  increment?: number;
  onboarding: {prompt: string};
  units?: string;
  scores?: Score[];
  warning?: string;
}

export interface Category {
  cid: string;
  seq?: number;
  label: string;
  categoryAverage?: number;
}

export interface Checklist {
  aid: string;
  skills: string[];
}
