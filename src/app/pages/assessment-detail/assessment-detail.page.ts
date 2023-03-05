import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Score } from '../../store/models/score.model';
import { AssessmentService } from '../../api/assessments/assessment.service';
import { Assessment, Category } from '../../store/assessments/assessment.model';
import { NewScorePage } from '../new-score/new-score.page';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { assessmentScores } from 'src/app/store/user/user.selectors';
import {
  selectAssessmentById,
  selectCategoryById,
} from 'src/app/store/assessments/assessment.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.page.html',
  styleUrls: ['./assessment-detail.page.scss'],
})
export class AssessmentDetailPage implements OnInit {
  @Input() assessment: Assessment;
  @Input() category: Category;
  @Input() scores: Score[];
  public scores$ = this.store.select(assessmentScores);
  public category$: Observable<Category>;
  public assessment$: Observable<Assessment>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navController: NavController,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.category$ = this.store.select(selectCategoryById(params.cid));
      this.assessment$ = this.store.select(selectAssessmentById(params.aid));
    });
    // this.assessmentService.getCurrentCategory().subscribe((data) => {
    //   this.category = data;
    // });
    // this.assessmentService.getCurrentAssessment().subscribe((data) => {
    //   this.assessment = data;
    // });
    // this.assessmentService.getCurrentScores().subscribe((data) => {
    //   this.scores = data;
    // });
  }

  async openNewScore() {
    const modal = await this.modalCtrl.create({
      component: NewScorePage,
      componentProps: {
        assessment: this.assessment,
      },
      cssClass: 'new-score-modal',
      presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    modal.present();
    modal.onDidDismiss().then((res) => {
      console.log('new score dismissed');
      console.log(res);
      this.navController.back();
      // this.loadData();
    });
  }

  getCheckList(aid: string) {
    return this.assessmentService.getChecklist(aid);
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
