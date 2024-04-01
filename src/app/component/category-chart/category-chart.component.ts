import {Component, Input, OnInit} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTheme, ApexXAxis, ApexYAxis, NgApexchartsModule} from 'ng-apexcharts';
import {User} from '../../store/user/user.model';

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
  standalone: true,
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class CategoryChartComponent implements OnInit {
  @Input() user: User;
  public chartOptions: Partial<ChartOptions>;

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Categories",
          data: Object.values(this.user.categoryScore)
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
        categories: Object.keys(this.user.categoryScore),
        labels: {
          show: true,
          style: {
            // cssClass: "chart-labels",
            colors: Array(Object.keys(this.user.categoryScore).length).fill("#ffffff"),
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

  createChart() {
    if (this.user) {
      this.chartOptions = {
        series: [
          {
            name: "Categories",
            data: Object.values(this.user.categoryScore)
          }
        ],
        chart: {
          type: 'radar'
        },
        labels: Object.keys(this.user.categoryScore)
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
  };


}
