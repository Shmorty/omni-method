import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexOptions, ApexPlotOptions, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule} from 'ng-apexcharts';
import {User} from '../../store/user/user.model';
import {UserService} from 'src/app/services/user/user.service';
import {Observable, Subscription} from 'rxjs';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Category} from '../../store/assessments/assessment.model';
import {UserFirestoreService} from 'src/app/services/user-firestore.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  fill: ApexFill,
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  theme: ApexTheme;
  // title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
};

@Component({
  standalone: true,
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class CategoryChartComponent implements OnInit, OnDestroy {
  @Input() user: User;
  private user$: Observable<User>;
  public chartOptions: Partial<ChartOptions>;
  private categories: Category[];
  private catSubscription: Subscription;

  constructor(
    private userService: UserService,
    private omniScoreService: OmniScoreService
  ) {}

  ngOnInit() {
    const chartFillColors = [
      '--ion-color-primary-tint',
      '--ion-color-primary',
    ].map(val =>
      getComputedStyle(document.documentElement).getPropertyValue(val)
    );
    // console.log("chartFillColors", chartFillColors);
    this.catSubscription = this.omniScoreService.categories$.subscribe((categories) => {
      this.categories = categories;
    });

    // need to subscribe to current user to set these values dynamically
    let stepSize = 100;
    const maxScore: number = Object.values(this.user.categoryScore).reduce((a, b) => Math.max(a, b));
    if (maxScore > 500) {
      stepSize = 250;
    }

    this.chartOptions = {
      chart: {
        type: 'radar',
        width: 460,
        // width: 'auto',
        // height: 'auto',
        // height: 285,
        // parentHeightOffset: 15,
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          // fontSize: '12px',
          fontSize: 'inherit',
          // colors: ['#5eb3f9'],
          colors: ['#000'],
        },
        background: {
          enabled: true,
          borderRadius: 4,
          padding: 8,
          borderWidth: 0.5,
          borderColor: '#fff',
        },
        // formatter: function (value, {seriesIndex, dataPointIndex, w}) {
        //   return w.globals.labels[dataPointIndex] + ": " + value
        // }
      },
      fill: {
        opacity: 0.5,
      },
      markers: {
        size: 0,
        shape: 'circle',
        radius: 6,
      },
      plotOptions: {
        radar: {
          size: 128,
          offsetX: -72,
          offsetY: 5,
          polygons: {
            // strokeColors: '#fff',
            // strokeWidth: '1px',
            fill: {
              colors: ['#daefff', '#b8dfff'],
              // colors: chartFillColors,
            }
          }
        }
      },
      series: [
        {
          name: "Categories",
          // data: Object.values(this.user.categoryScore)
          data: this.categoryValues(this.user.categoryScore),
          // color: '#35b5ff',
        }
      ],
      theme: {
        mode: 'light',
        // palette: 'palette1',
        monochrome: {
          enabled: true,
          color: '#5eb3f9',
          shadeIntensity: 0,
        }
      },
      // tooltip: {
      //   custom: function ({series, seriesIndex, dataPointIndex, w}) {
      //     return (
      //       '<div class="arrow_box">' +
      //       "<span>" +
      //       w.globals.labels[dataPointIndex] +
      //       ": " +
      //       series[seriesIndex][dataPointIndex] +
      //       "</span>" +
      //       "</div>"
      //     );
      //   }
      // },
      xaxis: {
        type: 'category',
        categories: this.categoryLabels(this.user.categoryScore),
        labels: {
          show: true,
          offsetY: 5,
          style: {
            colors: Array(this.categories.length).fill('white'),
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        stepSize: stepSize,
      },
    };

  }

  ngOnDestroy(): void {
    if (this.catSubscription) {
      this.catSubscription.unsubscribe();
    }
  }

  categoryValues(categoryScore: Object): number[] {
    let values = [];
    this.categories.forEach((cat) => {
      values.push(categoryScore[cat.cid]);
    });
    return values;
  }

  categoryLabels(categoryScore: Object): string[] {
    let result = [];
    this.categories.forEach((cat) => {
      // result.push(cat.label);
      result.push(cat.abrv);
    });
    return result;
  }

}
