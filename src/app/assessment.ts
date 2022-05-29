
export interface Assessment {
    id: number;
    label: string;
    score: number;
  }

  export interface Category {
    id: number,
    label: string,
    assessments: Assessment[]
  }