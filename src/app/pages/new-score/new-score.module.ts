import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NewScorePageRoutingModule} from './new-score-routing.module';

import {NewScorePage} from './new-score.page';
import {NumberPickerComponent} from 'src/app/component/number-picker/number-picker.component';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewScorePageRoutingModule,
    NumberPickerComponent,
  ],
  declarations: [NewScorePage],
})
export class NewScorePageModule {}
