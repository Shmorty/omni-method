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
    this.title = this.athlete.nickname ? this.athlete.nickname :
      this.athlete.firstName + ' ' + this.athlete.lastName;
    // get slected user's scores
    this.scores$ = await this.userFirestoreService.getUserScores(this.athlete.id);
    this.scores$.subscribe((sc) => {
      console.log("sc", sc);
      this.userScores = sc;
    },
      (err) => console.error("error", err)
    );
  }

  getCategoryScore(cid: string): number {
    return this.athlete.categoryScore[cid];
  }

  getCategoryAssessments(assessments: any[], cid: string) {
    return assessments.filter(a => a['cid'] === cid);
  }

  scoreClass(scoreDate: string): string {
    return OmniScoreService.scoreClass(scoreDate);
  }

  getScore(aid: string) {
    // console.log("getScore", aid);
    // console.log("userScores", this.userScores);
    let fl = this.userScores?.filter(sc => sc.aid === aid).sort(function (a, b) {
      return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
    });
    return (fl?.length > 0) ? fl[0] : undefined;
  }

}