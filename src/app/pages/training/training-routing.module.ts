import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosPage } from '../videos/videos.page';

import { TrainingPage } from './training.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPage,
    // children: [
    //   {
    //     path: 'video',
    //     component: VideosPage,
    //   },
    // ],
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('../videos/videos.module').then((m) => m.VideosPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPageRoutingModule {}
