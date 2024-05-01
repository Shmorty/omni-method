import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomePage} from './welcome.page';

const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    component: WelcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
