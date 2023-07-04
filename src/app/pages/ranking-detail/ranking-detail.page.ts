import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
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
  public scores$: Observable<Score[]>;
  public userScores: Score[];

  constructor(private store: Store,
    private userFirestoreService: UserFirestoreService) {}

  async ngOnInit() {
    // console.log("athlete", this.athlete);
    this.title = this.athlete.nickname ? this.athlete.nickname :
      this.athlete.firstName + ' ' + this.athlete.lastName;
    // const score = this.getScore(this.athlete.id, "DLFT");
    // score.then((scr) => {
    //   console.log("DLFT score", scr);
    // });
    this.scores$ = await this.userFirestoreService.getUserScores(this.athlete.id);
    this.scores$.subscribe((sc) => {
      console.log("sc", sc);
      this.userScores = sc;
    },
      (err) => console.error("error", err),
      () => console.log("scores$ observer complete")
    );
  }

  getCategoryScore(cid: string): number {
    return this.athlete.categoryScore[cid];
  }

  getCategoryAssessments(assessments: any[], cid: string) {
    return assessments.filter(a => a['cid'] === cid);
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

  getScore(aid: string) {
    console.log("getScore", aid);
    console.log("userScores", this.userScores);
    let fl = this.userScores.filter(sc => sc.aid === aid)
    return (fl.length > 0) ? fl[0] : undefined;
  }
  /*
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
    */
}