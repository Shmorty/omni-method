import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosPage } from './videos.page';

const routes: Routes = [
  {
    path: '',
    component: VideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosPageRoutingModule {}
