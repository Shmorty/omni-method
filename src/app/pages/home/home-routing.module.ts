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
        title: 'Profile',
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
          {
            path: 'scores',
            title: 'Scores',
            loadChildren: () =>
              import('../assessment-scores/assessment-scores.module').then(
                (m) => m.AssessmentScoresPageModule
              )
          }
        ],
      },
      {
        path: 'training',
        title: 'Training',
        loadChildren: () =>
          import('../training/training.module').then(
            (m) => m.TrainingPageModule
          ),
      },
      {
        path: 'community',
        title: 'Community',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../community/community.module').then(
                (m) => m.CommunityPageModule
              ),
          },
          {
            path: 'athlete',
            title: 'Athlete',
            loadChildren: () =>
              import('../ranking-detail/ranking-detail.module').then(
                (m) => m.RankingDetailPageModule
              ),
          },
        ]
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
