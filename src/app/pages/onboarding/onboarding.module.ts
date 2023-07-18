import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OnboardingPageRoutingModule} from './onboarding-routing.module';

import {OnboardingPage} from './onboarding.page';
import {NumberPickerComponent} from 'src/app/component/number-picker/number-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    NumberPickerComponent
  ],
  declarations: [
    OnboardingPage
  ]
})
export class OnboardingPageModule {}
