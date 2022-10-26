export interface Score {
  uid: string;
  aid: string | number;
  rawScore: number;
  calculatedScore?: number;
  scoreDate: string;
}
