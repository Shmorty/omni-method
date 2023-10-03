import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';

import {Tab3PageRoutingModule} from './tab3-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ShrinkingHeaderContent, ShrinkingHeaderComponent} from 'src/app/component/shrinking-header/shrinking-header.component';
import {ProfileHeaderComponent} from 'src/app/component/profile-header/profile-header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: Tab3Page}]),
    Tab3PageRoutingModule,
    ShrinkingHeaderComponent,
    ShrinkingHeaderContent,
    ProfileHeaderComponent
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
