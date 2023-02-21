import { User } from '../user/user.model';
import { Assessment } from '../assessments/assessment.model';
import { Category } from '../categories/category.model';
import { Score } from './score.model';
import { Standing } from './standing.model';

export interface userState {
  user: User;
  standing: Standing;
  categories: Category[];
  assessments: [
    {
      id: number;
      icon: string;
      label: string;
      description?: string;
      category: string;
      categoryAvg?: number;
      units?: string;
      scores: Score[];
    }
  ];
}
