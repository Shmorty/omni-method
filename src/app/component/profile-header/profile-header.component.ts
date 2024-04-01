import {CommonModule} from '@angular/common';
import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IonAccordionGroup, IonicModule} from '@ionic/angular';
import {Observable} from 'rxjs';
import {User} from '../../store/user/user.model';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';
import * as UserSelectors from 'src/app/store/user/user.selectors';
import {UserService} from 'src/app/services/user/user.service';
import {Store} from '@ngrx/store';
import {delay} from 'rxjs/operators';
import {CategoryChartComponent} from '../category-chart/category-chart.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserAvatarComponent,
    CategoryChartComponent
  ],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() background: any;
  public user$ = this.store.select(UserSelectors.selectUser); //.pipe(delay(5000));
  showChart: boolean = false;

  constructor(
    private store: Store,
    public userService: UserService,
    public element: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit() {}


  ngAfterViewInit() {
    console.log("set backgroune", this.background);
    console.log("element", this.element);
    this.renderer.setStyle(this.element.nativeElement, 'background', this.background);
  }

  toggleAccordion(event) {
    this.showChart = !this.showChart;
  }

}
