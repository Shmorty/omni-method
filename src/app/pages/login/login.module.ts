import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ShowHidePasswordModule } from 'src/app/component/show-hide-password/show-hide-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    LoginPageRoutingModule,
    ShowHidePasswordModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
