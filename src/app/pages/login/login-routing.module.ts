import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowHidePasswordComponent} from 'src/app/component/show-hide-password/show-hide-password.component';

import {LoginPage} from './login.page';

const routes: Routes = [
  {
    path: '',
    title: 'Login',
    component: LoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
