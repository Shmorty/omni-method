import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';

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
            loadChildren: () =>
              import('../profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
          {
            path: 'details',
            loadChildren: () =>
              import('../assessment-detail/assessment-detail.module').then(
                (m) => m.AssessmentDetailPageModule
              ),
          },
        ],
      },
      // path: '',
      // component: HomePage,
      // children: [
      //   {
      //     path: 'assessments',
      //     loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      //   },
      //   {
      //     path: 'assessments/:id',
      //     loadChildren: () => import('../assessment-detail/assessment-detail.module')
      //       .then( m => m.AssessmentDetailPageModule)
      //   },
      {
        path: 'training',
        loadChildren: () =>
          import('../training/training.module').then(
            (m) => m.TrainingPageModule
          ),
      },
      {
        path: 'community',
        loadChildren: () =>
          import('../community/community.module').then(
            (m) => m.CommunityPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/home/profile',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
