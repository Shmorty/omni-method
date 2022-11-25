import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'new-user',
    loadChildren: () =>
      import('./pages/new-user/new-user.module').then(
        (m) => m.NewUserPageModule
      ),
  },
  {
    path: 'new-score',
    loadChildren: () =>
      import('./pages/new-score/new-score.module').then(
        (m) => m.NewScorePageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      // enableTracing: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
