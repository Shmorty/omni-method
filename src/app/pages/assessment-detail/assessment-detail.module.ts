import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AssessmentDetailPageRoutingModule} from './assessment-detail-routing.module';

import {AssessmentDetailPage} from './assessment-detail.page';
import {EditChecklistComponent} from 'src/app/component/edit-checklist/edit-checklist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssessmentDetailPageRoutingModule,
    EditChecklistComponent
  ],
  declarations: [AssessmentDetailPage]
})
export class AssessmentDetailPageModule {}
