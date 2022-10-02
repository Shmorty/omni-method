import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  // {
  //   path: 'videos',
  //   loadChildren: () => import('./videos/videos.module').then( m => m.VideosPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'welcome',
  //   loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  // },
  // {
  //   path: 'assessment-detail',
  //   loadChildren: () => import('./assessment-detail/assessment-detail.module').then( m => m.AssessmentDetailPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
