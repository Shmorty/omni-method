import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NewScorePage} from './new-score.page';

const routes: Routes = [
  {
    path: '',
    title: 'New Score',
    component: NewScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewScorePageRoutingModule {}
