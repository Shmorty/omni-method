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
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexDataLabels,
  ApexTheme,
  ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  // xaxis: ApexXAxis;
  // title: ApexTitleSubtitle;
  theme: ApexTheme;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  labels: string[];
};

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserAvatarComponent,
    NgApexchartsModule
  ],
})
export class ProfileHeaderComponent implements OnInit {

  @Input() background: any;
  public user$ = this.store.select(UserSelectors.selectUser); //.pipe(delay(5000));
  @ViewChild('accordionGroup') accordionGroup: IonAccordionGroup;
  // @ViewChild('MyChart') myChart: ElementRef;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  moreOpen: boolean = false;
  // public chart: Chart;

  constructor(
    private store: Store,
    public userService: UserService,
    public element: ElementRef,
    public renderer: Renderer2
  ) {
    const categoryScore = {
      "Endurance": 67, "Flexability": 333, "META": 297,
      "NEUR": 43, "POWR": 81, "STRG": 158
    };
    this.chartOptions = {
      series: [
        {
          name: "Categories",
          data: Object.values(categoryScore)
        }
      ],
      chart: {
        type: 'radar',
        // height: 340,
        width: 340,
        toolbar: {
          show: false
        },
      },
      // labels: Object.keys(categoryScore),
      xaxis: {
        type: 'category',
        categories: Object.keys(categoryScore),
        labels: {
          show: true,
          style: {
            // cssClass: "chart-labels",
            colors: Array(Object.keys(categoryScore).length).fill("#ffffff"),
          }
        }
      },
      yaxis: {
        show: true,
        stepSize: 100,
        // stepSize: 250,
        // max: 1000,
        labels: {
          show: true,
          style: {
            colors: "#ffffff",
          }
        }
      }
    };

  }

  ngOnInit() {}

  createChart() {
    this.user$.subscribe((user) => {
      if (user) {
        this.chartOptions = {
          series: [
            {
              name: "Categories",
              data: Object.values(user.categoryScore)
            }
          ],
          chart: {
            type: 'radar'
          },
          labels: Object.keys(user.categoryScore)
        };

        // this.chart = new Chart(
        //   this.myChart.nativeElement,
        //   {
        //     type: 'radar',
        //     data: {
        //       labels: Object.keys(user.categoryScore),
        //       datasets: [
        //         {
        //           label: "Category",
        //           data: Object.values(user.categoryScore),
        //           fill: true,
        //           backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //           borderColor: 'rgba(255,99,132,1)',
        //           borderWidth: 1
        //         }
        //       ]
        //     },
        //     options: {
        //       scales: {
        //         r: {
        //           angleLines: {
        //             display: false
        //           },
        //           suggestedMin: 100,
        //           suggestedMax: 1000
        //         }
        //       },
        //       elements: {
        //         line: {
        //           borderWidth: 3
        //         }
        //       }
        //     }
        //   });
        // console.log("chart", this.chart);
      }
    }).unsubscribe();
  }

  ngAfterViewInit() {
    console.log("set backgroune", this.background);
    console.log("element", this.element);
    this.renderer.setStyle(this.element.nativeElement, 'background', this.background);
    this.createChart();

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
    }
  }

}
