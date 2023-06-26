import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingDetailPage } from './ranking-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RankingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingDetailPageRoutingModule {}
