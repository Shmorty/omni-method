import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AssessmentService } from '../../api/assessments/assessment.service';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.page.html',
  styleUrls: ['./assessment-detail.page.scss'],
})
export class AssessmentDetailPage implements OnInit {
  @Input() assessment: Assessment;
  @Input() category: Category;
  constructor(
    private modalController: ModalController,
    private router: Router,
    private assessmentService: AssessmentService
  ) {  }


  ngOnInit() {
    this.assessmentService.getCurrentCategory().subscribe(data => {
      this.category = data;
    });
    this.assessmentService.getCurrentAssessment().subscribe(data => {
      this.assessment = data;
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
