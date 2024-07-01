import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill, ApexMarkers,
  ApexPlotOptions,
  ApexTheme,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule
} from 'ng-apexcharts';
import {User} from '../../store/user/user.model';
import {Observable, Subscription} from 'rxjs';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {Assessment, Category} from '../../store/assessments/assessment.model';
import {Score} from '../../store/models/score.model';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

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
    // const chartFillColors = [
    //   '--ion-color-primary-tint',
    //   '--ion-color-primary',
    // ].map(val =>
    //   getComputedStyle(document.documentElement).getPropertyValue(val)
    // );

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
          name: "Assessment Scores",
          data: this.assessmentScores,
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
        categories: this.assessmentLabels(),
        labels: {
          show: true,
          offsetY: 5,
          style: {
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
      console.log("assessment-chart scoreArr", scoreArr.length);
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
    return this.assessments.map((a) => a.abrv);
  }

}
