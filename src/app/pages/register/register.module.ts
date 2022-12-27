import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ShowHidePasswordModule } from '../../component/show-hide-password/show-hide-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ShowHidePasswordModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
