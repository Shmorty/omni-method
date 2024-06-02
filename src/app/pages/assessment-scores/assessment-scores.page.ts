import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonRouterOutlet, IonicModule, NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {AssessmentService} from '../../services/assessments/assessment.service';
import {Assessment, Category} from '../../store/assessments/assessment.model';
import {Score} from '../../store/models/score.model';
import {UserService} from '../../services/user/user.service';
import {OmniScoreService} from '../../services/omni-score.service';

@Component({
  selector: 'app-assessment-scores',
  standalone: true,
  templateUrl: './assessment-scores.page.html',
  styleUrls: ['./assessment-scores.page.scss'],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class AssessmentScoresPage implements OnInit {
  @Input() assessment: Assessment;
  private aid: string;
  private cid: string;
  public category$: Observable<Category>;
  public assessment$: Observable<Assessment>;
  public scores$: Observable<Score[]>;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private assessmentService: AssessmentService,
    private userService: UserService,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("assessmentDetailPage.ngOnInit", params);
      this.aid = params.aid;
      this.cid = params.cid;
      this.category$ = this.assessmentService.getCategoryById(params.cid);
      this.assessment$ = this.assessmentService.getAssessmentById(params.aid);
      // this.checklist$ = this.assessmentService.getChecklist(params.aid);
      this.routerOutlet.swipeGesture = true;
    });
    this.scores$ = this.userService.getScoresForAssessment(this.aid);
  }

  goBack() {
    this.navController.back();
  }

  scoreExpirationMsg(score: Score) {
    const daysToExpire = OmniScoreService.scoreDaysToExpire(score.scoreDate);
    return daysToExpire === 0 ? 'Expired' : `Expires in ${daysToExpire} days`;
  }

  deleteScore(score: Score) {
    console.log('dispatch deleteAssessmentScore ' + score.scoreDate);
    this.userService.deleteScore(score);
    // this.navController.back();
  }

}
