import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CommunityPageRoutingModule} from './community-routing.module';

import {CommunityPage} from './community.page';
import {UserAvatarComponent} from 'src/app/component/user-avatar/user-avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityPageRoutingModule,
    UserAvatarComponent
  ],
  declarations: [CommunityPage]
})
export class CommunityPageModule {}
