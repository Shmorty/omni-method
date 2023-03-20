import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditProfilePage } from './edit-profile.page';
import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { UserAvatarComponent } from 'src/app/component/user-avatar/user-avatar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfilePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserAvatarComponent,
  ],
  declarations: [EditProfilePage],
})
export class EditProfilePageModule {}
