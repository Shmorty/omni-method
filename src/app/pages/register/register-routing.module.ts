import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterPage} from './register.page';

const routes: Routes = [
  {
    path: '',
    title: 'Register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
