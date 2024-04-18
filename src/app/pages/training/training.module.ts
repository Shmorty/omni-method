import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TrainingPageRoutingModule} from './training-routing.module';

import {TrainingPage} from './training.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TrainingPageRoutingModule],
  // declarations: [TrainingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrainingPageModule {}
