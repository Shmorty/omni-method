export interface Score {
  uid: string;
  aid: string;
  cid: string;
  scoreDate: string;
  expired: boolean;
  rawScore: number;
  calculatedScore?: number;
  notes?: string;
}
