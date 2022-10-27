export interface Score {
  uid: string;
  aid: string | number;
  scoreDate: string;
  rawScore: number;
  calculatedScore?: number;
  notes?: string;
}
