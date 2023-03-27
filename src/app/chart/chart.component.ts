import { Component, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, } from "chart.js";
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
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
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
    // console.log( this.chartType, currentValue)

    if( !currentValue ) return;
    this.isLoading = false;

    switch( this.chartType ){
      case 'line': {
        const labels = Object.keys( currentValue );
        const values = Object.values( currentValue );
        // const newChartData = JSON.parse( JSON.stringify(this.chartData) );
        // newChartData.labels = labels;
        // newChartData.datasets[0].data = values;
        // newChartData.datasets[0].label = this.label;

        // newChartData.datasets[0].fill = true;
        // newChartData.datasets[0].tension = 0.5;
        // newChartData.datasets[0].borderColor = '#FFE000';
        // newChartData.datasets[0].backgroundColor = 'transparent';

        this.chartData ={
          labels: labels,
          datasets: [ {
            //@ts-ignore
            data: values,
            fill : true,
            tension : 0.5,
            borderColor : '#FFE000',
            backgroundColor : 'transparent',
            label: this.label
          } ]
        }

        // this.chartData = newChartData;
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


    // console.log(newChartData)


    // this.chart?.update();
  }

  // public randomize(): void {
  //   this.chartType = this.chartType === 'bar' ? 'line' : 'bar';
  // }

}
