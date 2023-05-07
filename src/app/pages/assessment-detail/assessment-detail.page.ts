import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Score } from '../../store/models/score.model';
import { AssessmentService } from '../../services/assessments/assessment.service';
import { Assessment, Category } from '../../store/assessments/assessment.model';
import { NewScorePage } from '../new-score/new-score.page';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.page.html',
  styleUrls: ['./assessment-detail.page.scss'],
})
export class AssessmentDetailPage implements OnInit {
  public scores$: Observable<Score[]>;
  public category$: Observable<Category>;
  public assessment$: Observable<Assessment>;
  public checklist$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navController: NavController,
    private assessmentService: AssessmentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.category$ = this.assessmentService.getCategoryById(params.cid);
      this.assessment$ = this.assessmentService.getAssessmentById(params.aid);
      this.checklist$ = this.assessmentService.getChecklist(params.aid);
    });

    this.assessment$.subscribe((assessment) => {
      this.scores$ = this.userService.getScoresForAssessment(assessment);
    });
  }

  deleteScore(score: Score) {
    console.log('dispatch deleteAssessmentScore ' + score.scoreDate);
    this.userService.deleteScore(score);
    this.navController.back();
  }

  async openNewScore(assessment: Assessment) {
    const modal = await this.modalCtrl.create({
      component: NewScorePage,
      componentProps: {
        assessment: assessment,
      },
      cssClass: 'new-score-modal',
      presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    modal.present();
    modal.onDidDismiss().then((res) => {
      this.navController.back();
    });
  }

  toggleCheckItem(item) {
    console.log(item);
  }
  // async closeModel() {
  //   const close: string = "Modal Removed";
  //   await this.modalController.dismiss(close);
  // }

  // back(): void {
  //   this._location.historyGo(-1);
  // }
}
