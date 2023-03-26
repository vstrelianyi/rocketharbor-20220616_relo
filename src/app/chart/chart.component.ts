import { Component, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, } from "chart.js";
// https://www.npmjs.com/package/ng2-charts/v/2.4.3
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  @Input() data: any | null;
  @Input() label: string;
  @Input() chartType: ChartType;
  isLoading : boolean= true;

  public chartOptions: ChartConfiguration['options'] = {
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
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
    }
  };

  // public chartData: ChartData;
  public chartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        // label: this.label,

      }
    ]
  };

  // public chartData: ChartData<'pie', number[], string | string[]> = {
  //   labels: [ '1', '2', 'Mail Sales' ],
  //   datasets: [ {
  //     data: [ 300, 500, 100 ]
  //   } ]
  // };

  public lineChartLegend = true;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges( changes: SimpleChanges ) {
    const { data: { currentValue } } = changes;
    console.log( this.chartType, currentValue)
    console.log(this.chartData);

    if( !currentValue || !this.chartType ) return;
    this.isLoading = false;
    switch( this.chartType ){
      case 'line': {
        const labels = Object.keys( currentValue );
        const values = Object.values( currentValue );
        this.chartData ={
          labels: labels,
          datasets: [ {
            data: values,
            fill : true,
            // tension : 0.5,
            borderColor : '#FFE000',
            backgroundColor : 'transparent',
            label: this.label
          } ]
        }
        break;
      }
      case 'pie': {
          this.chartData ={
            labels: [ 'Rent', 'Own',  ],
            datasets: [ {
              data: [ 300, 500, ],
              backgroundColor: ["#000000", "#FFE000"],
              label: this.label
            } ]
          }
        break;
      }
      default:{

      }
    }
    // this.chart?.update();
  }
}
