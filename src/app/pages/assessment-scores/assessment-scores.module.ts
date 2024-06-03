import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AssessmentScoresPageRoutingModule} from './assessment-scores-routing.module';

import {AssessmentScoresPage} from './assessment-scores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssessmentScoresPageRoutingModule
  ],
  // declarations: [AssessmentScoresPage]
})
export class AssessmentScoresPageModule {}
