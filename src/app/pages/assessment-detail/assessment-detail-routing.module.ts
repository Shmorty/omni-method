import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AssessmentDetailPage} from './assessment-detail.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AssessmentDetailPage,
      },
      {
        path: 'skill',
        loadChildren: () =>
          import('../skill-detail/skill-detail.module').then(
            (m) => m.SkillDetailPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessmentDetailPageRoutingModule {}
