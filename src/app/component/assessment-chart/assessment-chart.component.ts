import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexPlotOptions, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule} from 'ng-apexcharts';
import {User} from '../../store/user/user.model';
import {UserService} from '../../services/user/user.service';
import {Observable, Subscription, take} from 'rxjs';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Assessment, Category} from '../../store/assessments/assessment.model';
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
  selector: 'app-assessment-chart',
  templateUrl: './assessment-chart.component.html',
  styleUrls: ['./assessment-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class AssessmentChartComponent implements OnInit, OnDestroy {
  @Input() user: User;
  private user$: Observable<User>;
  public chartOptions: Partial<ChartOptions>;
  private categories: Category[];
  private assessments: Assessment[];
  private catSubscription: Subscription;

  constructor(
    private userService: UserService,
    private omniScoreService: OmniScoreService
  ) {}

  ngOnInit() {
    this.omniScoreService.assessments$.subscribe((assessments) => {
      this.assessments = assessments;
    });
    this.catSubscription = this.omniScoreService.categories$.subscribe((categories) => {
      this.categories = categories;
    });

    const chartFillColors = [
      '--ion-color-primary-tint',
      '--ion-color-primary',
    ].map(val =>
      getComputedStyle(document.documentElement).getPropertyValue(val)
    );
    // console.log("chartFillColors", chartFillColors);

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
              colors: chartFillColors
            }
          }
        }
      },
      series: [
        {
          name: "Assessment Scores",
          data: this.assessmentValues(this.user),
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
        categories: this.assessmentLabels(),
        labels: {
          show: false,
          style: {
            // colors: Array(this.categories.length).fill('white'),
            colors: Array(this.assessments.length).fill('white'),
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

  assessmentValues(user: User) {
    const scores: number[] = [];
    this.assessments.forEach((element) => {
      // console.log("assessment", element);
      this.userService.getCurrentScoreForAssessment(element.aid)
        .pipe(take(1)).subscribe((val) => {
          console.log("score", val);
          scores.push(val?.calculatedScore | 0);
        });
    });
    console.log("assessmentValues", scores);
    return scores;
  }

  assessmentLabels(): string[] {
    return this.assessments.map((a) => a.label);
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
