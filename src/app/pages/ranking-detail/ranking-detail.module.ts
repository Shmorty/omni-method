import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RankingDetailPageRoutingModule} from './ranking-detail-routing.module';

import {RankingDetailPage} from './ranking-detail.page';
// import {CategoryChartComponent} from '../../component/category-chart/category-chart.component';
import {ProfileHeaderComponent} from '../../component/profile-header/profile-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingDetailPageRoutingModule,
    // CategoryChartComponent,
    ProfileHeaderComponent
  ],
  declarations: [RankingDetailPage]
})
export class RankingDetailPageModule {}
