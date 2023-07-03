import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {UserFirestoreService} from 'src/app/services/user-firestore.service';
import {selectAllAssessments, selectAllCategories} from 'src/app/store/assessments/assessment.selector';
import {Score} from 'src/app/store/models/score.model';
import {User} from 'src/app/store/user/user.model';

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

  constructor(private store: Store, private userFirestoreService: UserFirestoreService) {}

  ngOnInit() {
    // console.log("athlete", this.athlete);
    this.title = this.athlete.nickname ? this.athlete.nickname : this.athlete.firstName + ' ' + this.athlete.lastName;
    // const score = this.getScore(this.athlete.id, "DLFT");
    // score.then((scr) => {
    //   console.log("DLFT score", scr);
    // });
  }

  getCategoryScore(cid: string): number {
    return this.athlete.categoryScore[cid];
  }

  scoreClass(scoreDate: string): string {
    let days = OmniScoreService.calculateDays(scoreDate);
    console.log("soreDays", days);
    if (days > 90) {
      return 'stale';
    } else if (days > 60) {
      return 'warn';
    } else if (days > 30) {
      return 'caution';
    }
  }

  async getScore(uid: string, aid: string) {
    console.log("getScore", uid, aid);
    let res = null;
    const scores = await this.userFirestoreService.getUserAssessmentScores(uid, aid);
    // return scores;
    console.log(aid, "scores.length", scores.length)
    return scores[0].data();
    // scores.then((s) => {
    //   console.log("s", s[0]);
    //   res = s[0];
    // })
    // return res;
    // return this.userFirestoreService.getUserAssessmentScores(uid, aid).pipe(
    //   tap((results) => {
    //     results?.sort(function (a, b) {
    //       return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
    //     })
    //   })
    // );
    // return this.store.select(UserSelectors.assessmentScores(assessment)).pipe(
    //   tap((results) => {
    //     results?.sort(function (a, b) {
    //       return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
    //     });
    //   })
    // );
  }
}