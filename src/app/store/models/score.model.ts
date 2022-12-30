export interface Score {
  uid: string;
  aid: string;
  scoreDate: string;
  rawScore: number;
  calculatedScore?: number;
  notes?: string;
}
