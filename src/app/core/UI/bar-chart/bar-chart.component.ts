import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef;
  @Input() chartdata!:number[]
  @Input() chartlabels!:string[]
  @Input() chartType!:keyof ChartTypeRegistry
  @Input() chartTitle:string=""
  ngAfterViewInit() {
    new Chart(this.myChart.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.chartlabels,
        datasets: [{
          label: this.chartTitle,
          data: this.chartdata,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
