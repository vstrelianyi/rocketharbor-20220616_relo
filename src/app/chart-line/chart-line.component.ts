// https://www.chartjs.org/docs/2.9.4/

import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, } from "chart.js";

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss']
})
export class ChartLineComponent implements OnInit {

  @Input() data: any | null;
  @Input() label: string;

  // public lineChartData = ;
  // public lineChartLabels = ;

  public chartData ={
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [ {
      data: [120, 150, 180, 90],
      // backgroundColor: ["#000000", "#FFE000"],
      label: 'test'
    } ]
  }

  public chartOptions = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    scales: {
      // new version
      // x: {},
      // y: {
      //   min: 10
      // }


      // old version
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: true,
      position: 'bottom'
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
