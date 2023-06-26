import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingDetailPageRoutingModule } from './ranking-detail-routing.module';

import { RankingDetailPage } from './ranking-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingDetailPageRoutingModule
  ],
  declarations: [RankingDetailPage]
})
export class RankingDetailPageModule {}
