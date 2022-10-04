import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'details',
            loadChildren: () => import('../assessment-detail/assessment-detail.module')
              .then( m => m.AssessmentDetailPageModule)
          }
        ]
      },
      {
        path: 'videos',
        loadChildren: () => import('../videos/videos.module').then(m => m.VideosPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/home/profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/profile',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
