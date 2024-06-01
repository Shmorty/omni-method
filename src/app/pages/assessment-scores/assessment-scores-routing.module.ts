import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentScoresPage } from './assessment-scores.page';

const routes: Routes = [
  {
    path: '',
    component: AssessmentScoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentScoresPageRoutingModule {}
