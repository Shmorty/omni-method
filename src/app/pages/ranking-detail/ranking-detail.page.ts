import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';
import {AssessmentService} from 'src/app/services/assessments/assessment.service';
import {CommunityService} from 'src/app/services/community/community.service';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Assessment} from '../../store/assessments/assessment.model';
import {Score} from 'src/app/store/models/score.model';
import {Analytics, logEvent} from '@angular/fire/analytics';

@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.page.html',
  styleUrls: ['./ranking-detail.page.scss'],
})
export class RankingDetailPage implements OnInit {
  private analytics: Analytics = inject(Analytics);
  public athlete$ = this.communityService.getSelectedUser();
  public categories$ = this.assessmentService.getAllCategories();
  public assessments$ = this.assessmentService.getAllAssessments();
  public isLoading$ = this.communityService.isLoading();
  public scores$ = this.communityService.getSelectedUserScores();
  showChart = false;

  constructor(
    private assessmentService: AssessmentService,
    private communityService: CommunityService,
    private navController: NavController,
  ) {}

  async ngOnInit() {
    console.log("RankingDetailPage.ngOnInit athlete$", this.athlete$);
    this.athlete$
      .pipe(filter(usr => usr !== undefined))
      .pipe(take(1))
      .subscribe(athlete => {
        console.log("view athlete", athlete.username);
        // log analytics event
        logEvent(this.analytics, "view_athlete", {username: athlete.username})
      });
  }

  getCategoryAssessments(assessments: Assessment[], cid: string) {
    return assessments.filter(a => a.cid === cid);
  }

  scoreClass(scoreDate: string): string {
    return OmniScoreService.scoreClass(scoreDate);
  }

  getScore(scores: Score[], aid: string) {
    let fl = scores?.filter(sc => sc.aid === aid).sort(function (a, b) {
      return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
    });
    return (fl?.length > 0) ? fl[0] : undefined;
  }

  goBack() {
    this.navController.navigateBack('/home/community');
    // this.navController.back();
  }

}