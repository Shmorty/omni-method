import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillDetailPageRoutingModule } from './skill-detail-routing.module';

import { SkillDetailPage } from './skill-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillDetailPageRoutingModule
  ],
  declarations: [SkillDetailPage]
})
export class SkillDetailPageModule {}
