import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {Category} from '../store/assessments/assessment.model';
import {
  assessmentsByCategory,
  selectAllAssessments,
  selectAllCategories,
} from '../store/assessments/assessment.selector';
import * as OmniScoreActions from '../store/omni-score/omni-score.actions';
import {assessmentScores, userScores} from '../store/user/user.selectors';

export const oneDay = 1000 * 3600 * 24;

@Injectable({
  providedIn: 'root',
})
export class OmniScoreService {
  public categories$ = this.store.select(selectAllCategories);
  public assessments$ = this.store.select(selectAllAssessments);
  public scores$ = this.store.select(userScores);

  constructor(private store: Store) {}

  // setCategoryScore(cat: Category, score: number) {
  //   console.log('setCategoryScore ', cat.label, ' = ', score);
  //   this.store.dispatch(
  //     OmniScoreActions.setCategoryScore({ cid: cat.cid, score: score })
  //   );
  // }

  public static calculateDays(scoreDate: string) {
    // console.log("scoreDate", scoreDate);
    var date = new Date(scoreDate);
    let days = Math.ceil((Date.now().valueOf() - date.valueOf()) / oneDay);
    return days;
  }

  public static scoreClass(scoreDate: string): string {
    let days = OmniScoreService.calculateDays(scoreDate);
    // console.log("soreDays", days);
    if (days > 90) {
      return 'stale';
    } else if (days > 60) {
      return 'warn';
    } else if (days > 30) {
      return 'caution';
    }
  }

  public static scoreDaysToExpire(scoreDate: string): number {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const today_ms = new Date().getTime();
    const score_date_ms = new Date(scoreDate).getTime();
    const days_old = Math.round((today_ms - score_date_ms) / ONE_DAY);
    const expire = 90 - days_old;
    return expire < 0 ? 0 : expire;
  }

  calculateScores() {
    let omniScore = 0;

    console.log('start OmniScoreService.calculateScores()');

    if (this.assessments$ && this.scores$) {
      let unadjustedScore = 0;
      this.categories$.pipe(take(1)).subscribe((categories) =>
        categories.forEach((cat) => {
          let catTotal = 0;
          let assessmentCount = 0;
          // console.log(cat.label);
          this.store
            .select(assessmentsByCategory(cat))
            .pipe(take(1))
            .subscribe((assessments) =>
              assessments.forEach((assessment) => {
                assessmentCount++;
                // get score for assessment
                // console.log(assessment.label);
                this.store
                  .select(assessmentScores(assessment.aid))
                  .pipe(take(1))
                  .subscribe((scores) => {
                    // console.log('  - score ' + scores);
                    if (scores?.length > 0) {
                      let sortedScores = scores.sort(function (a, b) {
                        return (
                          new Date(b.scoreDate).valueOf() -
                          new Date(a.scoreDate).valueOf()
                        );
                      });
                      let scoreAge = OmniScoreService.calculateDays(
                        sortedScores[0].scoreDate
                      );
                      if (scoreAge < 90) {
                        catTotal += sortedScores[0].calculatedScore;
                      }
                    }
                  });
              })
            );
          let curScore = Math.round(catTotal / assessmentCount);
          // this.setCategoryScore(cat, curScore);
          unadjustedScore += curScore;
        })
      );
      omniScore = Math.round(Math.pow(unadjustedScore / 1500, 2) * 1500);
      console.log('setOmniScore: ', omniScore);
      // this.store.dispatch(OmniScoreActions.setOmniScore({ score: omniScore }));
    }
  }
}
