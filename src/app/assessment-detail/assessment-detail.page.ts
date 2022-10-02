import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Assessment } from '../store/models/assessment.model';
import { Category } from '../store/models/category.model';

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
    private _location: Location
  ) { let count = 0; }


  ngOnInit() { }

  // async closeModel() {
  //   const close: string = "Modal Removed";
  //   await this.modalController.dismiss(close);
  // }

  // back(): void {
  //   this._location.historyGo(-1);
  // }
}
