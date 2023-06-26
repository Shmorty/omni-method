import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Assessment} from 'src/app/store/assessments/assessment.model';
import {selectAllAssessments, selectAllCategories} from 'src/app/store/assessments/assessment.selector';
import {User} from 'src/app/store/user/user.model';
import * as UserSelectors from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.page.html',
  styleUrls: ['./ranking-detail.page.scss'],
})
export class RankingDetailPage implements OnInit {
  public athlete: User;
  public title: string;
  public categories$ = this.store.select(selectAllCategories);
  public assessments$ = this.store.select(selectAllAssessments);

  constructor(private store: Store) {}

  ngOnInit() {
    console.log("athlete", this.athlete);
    this.title = this.athlete.nickname ? this.athlete.nickname : this.athlete.firstName + ' ' + this.athlete.lastName;
  }

  getCategoryScore(cid: string): number {
    return this.athlete.categoryScore[cid];
  }

  scoreClass(scoreDate: string): string {
    let days = OmniScoreService.calculateDays(scoreDate);

    if (days > 90) {
      return 'stale';
    } else if (days > 60) {
      return 'warn';
    } else if (days > 30) {
      return 'caution';
    }
  }

  getScores$(assessment: Assessment) {
    return this.store.select(UserSelectors.assessmentScores(assessment)).pipe(
      tap((results) => {
        results?.sort(function (a, b) {
          return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
        });
      })
    );
  }
}