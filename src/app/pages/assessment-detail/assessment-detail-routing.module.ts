import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessmentDetailPage } from './assessment-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AssessmentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentDetailPageRoutingModule {}
