import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SkillDetailPage} from './skill-detail.page';

const routes: Routes = [
  {
    path: '',
    title: 'Skill Detail',
    component: SkillDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillDetailPageRoutingModule {}
