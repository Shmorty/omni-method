import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NewUserPage} from './new-user.page';

const routes: Routes = [
  {
    path: '',
    title: 'New User',
    component: NewUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewUserPageRoutingModule {}
