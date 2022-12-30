import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Score } from '../../store/models/score.model';
import { AssessmentService } from '../../api/assessments/assessment.service';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';
import { NewScorePage } from '../new-score/new-score.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.page.html',
  styleUrls: ['./assessment-detail.page.scss'],
})
export class AssessmentDetailPage implements OnInit {
  @Input() assessment: Assessment;
  @Input() category: Category;
  @Input() scores: Score[];
  constructor(
    private modalCtrl: ModalController,
    private navController: NavController,
    private router: Router,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    this.assessmentService.getCurrentCategory().subscribe((data) => {
      this.category = data;
    });
    this.assessmentService.getCurrentAssessment().subscribe((data) => {
      this.assessment = data;
    });
    this.assessmentService.getCurrentScores().subscribe((data) => {
      this.scores = data;
    });
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

  // async closeModel() {
  //   const close: string = "Modal Removed";
  //   await this.modalController.dismiss(close);
  // }

  // back(): void {
  //   this._location.historyGo(-1);
  // }
}
