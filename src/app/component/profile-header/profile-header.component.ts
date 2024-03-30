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
import {Chart, ChartItem} from 'chart.js/auto';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserAvatarComponent,
  ],
})
export class ProfileHeaderComponent implements OnInit {

  @Input() background: any;
  public user$ = this.store.select(UserSelectors.selectUser); //.pipe(delay(5000));
  @ViewChild('accordionGroup') accordionGroup: IonAccordionGroup;
  @ViewChild('MyChart') myChart: ElementRef;
  moreOpen: boolean = false;
  public chart: Chart;

  constructor(
    private store: Store,
    public userService: UserService,
    public element: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit() {}

  createChart() {
    this.user$.subscribe((user) => {
      if (user) {

        this.chart = new Chart(
          this.myChart.nativeElement,
          {
            type: 'radar',
            data: {
              labels: Object.keys(user.categoryScore),
              datasets: [
                {
                  label: "Category",
                  data: Object.values(user.categoryScore),
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1
                }
              ]
            },
            options: {
              scales: {
                r: {
                  angleLines: {
                    display: false
                  },
                  suggestedMin: 100,
                  suggestedMax: 1000
                }
              },
              elements: {
                line: {
                  borderWidth: 3
                }
              }
            }
          });
        console.log("chart", this.chart);
      }
    }).unsubscribe();
  }

  ngAfterViewInit() {
    console.log("set backgroune", this.background);
    console.log("element", this.element);
    this.renderer.setStyle(this.element.nativeElement, 'background', this.background);
  }

  toggleAccordion(event) {
    const nativeEl = this.accordionGroup;
    console.log(nativeEl);
    console.log(event.target);
    if (nativeEl.value === 'moreProfile') {
      nativeEl.value = undefined;
      this.moreOpen = false;
    } else {
      nativeEl.value = 'moreProfile';
      this.moreOpen = true;
      this.createChart();
    }
  }

}
