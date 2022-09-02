import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssessmentDetailPageRoutingModule } from './assessment-detail-routing.module';

import { AssessmentDetailPage } from './assessment-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssessmentDetailPageRoutingModule
  ],
  declarations: [AssessmentDetailPage]
})
export class AssessmentDetailPageModule {}
