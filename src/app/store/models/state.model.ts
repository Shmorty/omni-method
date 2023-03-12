import { Assessment } from '../assessments/assessment.model';
import { Category } from '../omni-score/omni-score.model';
import { User } from '../user/user.model';

export interface UserState {
  loading: boolean;
  user: User;
  error: string;
}

// export interface AppState {
//   readonly user: User;
//   readonly categories: Array<Category>;
//   readonly assessments: Array<Assessment>;
// }
