import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VerifyEmailPage} from './verify-email.page';

const routes: Routes = [
  {
    path: '',
    title: 'Verify Email',
    component: VerifyEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyEmailPageRoutingModule {}
