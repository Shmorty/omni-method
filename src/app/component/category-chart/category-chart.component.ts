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
    private omniScoreService: OmniScoreService,
    private userFirestoreService: UserFirestoreService
  ) {}

  ngOnInit() {
    this.catSubscription = this.omniScoreService.categories$.subscribe((categories) => {
      this.categories = categories;
    });

    // need to subscribe to current user to set these values dynamically
    let stepSize = 100;
    const maxScore: number = Object.values(this.user.categoryScore).reduce((a, b) => Math.max(a, b));
    if (maxScore > 500) {
      stepSize = 250;
    }
    // this.user$ = this.userService.getUser();
    // this.user$ = this.userFirestoreService.getUserById(this.user.id);
    // console.log("categoryScore", this.user.categoryScore);
    // console.log("labels", this.categoryLabels(this.user.categoryScore));
    // this.user$.subscribe((user) => {
    this.chartOptions = {
      chart: {
        type: 'radar',
        // height: 380,
        width: 460,
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          // fontSize: '12px',
          fontSize: 'inherit',
          colors: ['white'],
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
        size: 16,
        shape: 'rect',
        radius: 6,
      },
      plotOptions: {
        radar: {
          size: 128,
          offsetX: -72,
          offsetY: 6,
          polygons: {
            strokeColors: '#fff',
            strokeWidth: '1px',
            fill: {
              colors: ['#daefff', '#b8dfff']
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
        palette: 'palette1',
      },
      tooltip: {
        custom: function ({series, seriesIndex, dataPointIndex, w}) {
          // console.log("series", series,
          //   "seriesIndex", seriesIndex,
          //   "dataPointIndex", dataPointIndex,
          //   "w", w);
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.globals.labels[dataPointIndex] +
            ": " +
            series[seriesIndex][dataPointIndex] +
            "</span>" +
            "</div>"
          );
        }
      },
      xaxis: {
        type: 'category',
        categories: this.categoryLabels(this.user.categoryScore),
        labels: {
          show: false,
          style: {
            colors: Array(this.categories.length).fill('white'),
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        show: false,
        stepSize: stepSize,
        // labels: {
        //   show: true,
        //   style: {
        //     colors: "#ffffff",
        //   }
        // }
      },
    };
    // });
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
      result.push(cat.label);
    });
    return result;
  }

}
