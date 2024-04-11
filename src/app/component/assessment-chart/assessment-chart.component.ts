import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexMarkers, ApexPlotOptions, ApexTheme, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule} from 'ng-apexcharts';
import {User} from '../../store/user/user.model';
import {Observable, Subscription, skip, take, tap} from 'rxjs';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Assessment, Category} from '../../store/assessments/assessment.model';
import {Score} from '../../store/models/score.model';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

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
  imports: [
    CommonModule,
    IonicModule,
    NgApexchartsModule
  ],
})
export class AssessmentChartComponent implements OnInit, OnDestroy {
  @Input() user: User;
  // @Input() scores: Score[];
  @Input() scores$: Observable<Score[]>;
  public chartOptions: Partial<ChartOptions> = undefined;
  private categories: Category[];
  private assessments: Assessment[];
  private catSubscription: Subscription;
  private assessmentScores: number[] = [];

  constructor(
    private omniScoreService: OmniScoreService
  ) {}

  ngOnInit() {
    // console.log("ngOnInit scores", this.scores);
    this.catSubscription = this.omniScoreService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
    this.omniScoreService.assessments$.subscribe((assessments) => {
      this.assessments = assessments;
    });
    this.setAssessmentValues();
  }
  setChartOptions() {
    const chartFillColors = [
      '--ion-color-primary-tint',
      '--ion-color-primary',
    ].map(val =>
      getComputedStyle(document.documentElement).getPropertyValue(val)
    );

    // need to subscribe to current user to set these values dynamically
    let stepSize = 100;
    const maxScore: number = Object.values(this.user.categoryScore).reduce((a, b) => Math.max(a, b));
    if (maxScore > 500) {
      stepSize = 250;
    }

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
        enabled: false,
        offsetX: 0,
        offsetY: 0,
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
        size: 0,
        shape: 'rect',
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
              // colors: chartFillColors
            }
          }
        }
      },
      series: [
        {
          name: "Assessment Scores",
          data: this.assessmentScores,
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
      tooltip: {
        custom: function ({series, seriesIndex, dataPointIndex, w}) {
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
          show: true,
          offsetY: 5,
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
      },
    };

  }

  ngOnDestroy(): void {
    if (this.catSubscription) {
      this.catSubscription.unsubscribe();
    }
  }

  async setAssessmentValues() {
    // let userScores: Score[] = [];
    await this.scores$.subscribe((scoreArr) => {
      console.log("assessment-chart scoreArr", scoreArr);
      if (scoreArr.length > 0) {
        this.assessmentScores = [];
        this.assessments.forEach((assessment) => {
          // console.log("assessment", element);
          this.assessmentScores.push(scoreArr.filter((s) => s.aid === assessment.aid)?.sort(function (a, b) {
            return (Date.parse(b?.scoreDate) - Date.parse(a?.scoreDate));
          }).shift()?.calculatedScore | 0);
        });
        console.log("assessment-chart assessmentScores", this.assessmentScores);
        this.setChartOptions();
      }
    });
  }

  assessmentLabels(): string[] {
    return this.assessments.map((a) => a.aid);
  }

}
