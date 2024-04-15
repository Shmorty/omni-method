import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexFill, ApexMarkers, ApexPlotOptions, ApexTheme, ApexXAxis, ApexYAxis, NgApexchartsModule} from 'ng-apexcharts';
import {User} from '../../store/user/user.model';
import {UserService} from 'src/app/services/user/user.service';
import {Observable, Subscription} from 'rxjs';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Category} from '../../store/assessments/assessment.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill,
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  theme: ApexTheme;
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
    // const chartFillColors = [
    //   '--ion-color-primary-tint',
    //   '--ion-color-primary',
    // ].map(val =>
    //   getComputedStyle(document.documentElement).getPropertyValue(val)
    // );

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
        height: 285,
        toolbar: {
          show: false
        },
      },
      fill: {
        opacity: 0.5,
      },
      markers: {
        size: 0,
      },
      plotOptions: {
        radar: {
          polygons: {
            fill: {
              colors: ['#daefff', '#b8dfff'],
            }
          }
        }
      },
      series: [
        {
          name: "Categories",
          data: this.categoryValues(this.user.categoryScore),
        }
      ],
      theme: {
        mode: 'light',
        monochrome: {
          enabled: true,
          color: '#5eb3f9',
          shadeIntensity: 0,
        }
      },
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
