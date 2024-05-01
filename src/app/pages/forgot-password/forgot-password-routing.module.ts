import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ForgotPasswordPage} from './forgot-password.page';

const routes: Routes = [
  {
    path: '',
    title: 'Forgot Password',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordPageRoutingModule {}
