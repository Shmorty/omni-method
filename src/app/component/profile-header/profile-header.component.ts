import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IonAccordionGroup, IonicModule} from '@ionic/angular';
import {Observable, filter, of, take} from 'rxjs';
import {User} from '../../store/user/user.model';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';
import {UserService} from 'src/app/services/user/user.service';
import {CategoryChartComponent} from '../category-chart/category-chart.component';
import {AssessmentChartComponent} from '../assessment-chart/assessment-chart.component';
import {SwiperOptions} from 'swiper/types';
import {Pagination} from 'swiper/modules';
import {Score} from 'src/app/store/models/score.model';
import {UserLevelComponent} from '../user-level/user-level.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserAvatarComponent,
    CategoryChartComponent,
    AssessmentChartComponent,
    UserLevelComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() background: any;
  @ViewChild('swiper', {static: false}) swiper;
  @Input() athlete$: Observable<User>;
  @Input() scores$: Observable<Score[]>;
  public user$: Observable<User>;
  showChart = true;
  showPersonalData = false;
  getAge = UserService.getAge;

  public chartSlidesOptions: SwiperOptions = {
    slidesPerView: 1,
  };

  constructor(
    public userService: UserService,
    public element: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit() {
    //   this.user$ = this.store.select(UserSelectors.selectUser); //.pipe(delay(5000));
    this.userService.getUser().pipe(take(1)).subscribe((curUser) => {
      console.log("current User", curUser);
      this.athlete$
        .pipe(filter(usr => usr != undefined))
        .pipe(take(1))
        .subscribe((dsplUser) => {
          console.log("display User", dsplUser);
          this.showPersonalData = (dsplUser?.id == curUser?.id);
          console.log("showPersonalData", this.showPersonalData);
        })
    })
    this.user$ = this.athlete$;
    console.log("profile header ngOnInit scores$", this.scores$);
  }


  ngAfterViewInit() {
    console.log("set background", this.background);
    console.log("element", this.element);
    this.renderer.setStyle(this.element.nativeElement, 'background', this.background);
    console.log("ngAfterViewInit setTimeout");
    setTimeout(() => {
      console.log("timeout begin");
      this.swiper?.nativeElement.initialize(Pagination);
      console.log("timeout done");
    });
    console.log("ngAfterViewInit done");
  }

  toggleAccordion(event) {
    this.showChart = !this.showChart;
  }

}
