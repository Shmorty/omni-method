import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {EditProfilePage} from './edit-profile.page';
import {EditProfilePageRoutingModule} from './edit-profile-routing.module';
import {UserAvatarComponent} from 'src/app/component/user-avatar/user-avatar.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NumberPickerComponent} from 'src/app/component/number-picker/number-picker.component';
import {HeightPickerComponent} from 'src/app/component/height-picker/height-picker.component';
import {GenderPickerComponent} from 'src/app/component/gender-picker/gender-picker.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfilePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserAvatarComponent,
    ImageCropperModule,
    NumberPickerComponent,
    HeightPickerComponent,
    GenderPickerComponent,
  ],
  declarations: [EditProfilePage],
})
export class EditProfilePageModule {}
