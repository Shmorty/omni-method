import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NewScorePageModule } from '../new-score/new-score.module';

@NgModule({
  declarations: [ProfilePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // ExploreContainerComponentModule,
    ProfilePageRoutingModule,
    // NgxSkeletonLoaderModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      appearance: 'line',
      theme: {
        extendsFromRoot: true,
        'margin-bottom': '0px',
      },
    }),
    NewScorePageModule,
  ],
})
export class ProfilePageModule {}
