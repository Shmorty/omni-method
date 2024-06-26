import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NewUserPageRoutingModule} from './new-user-routing.module';

import {NewUserPage} from './new-user.page';
import {NumberPickerComponent} from 'src/app/component/number-picker/number-picker.component';
import {GenderPickerComponent} from 'src/app/component/gender-picker/gender-picker.component';
import {HeightPickerComponent} from 'src/app/component/height-picker/height-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserPageRoutingModule,
    ReactiveFormsModule,
    NumberPickerComponent,
    GenderPickerComponent,
    HeightPickerComponent
  ],
  declarations: [NewUserPage],
})
export class NewUserPageModule {}
