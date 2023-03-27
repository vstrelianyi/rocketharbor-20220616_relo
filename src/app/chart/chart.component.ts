import { Component, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

  public chartOptions : ChartConfiguration['options'];

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
    Chart.register( ChartDataLabels );
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

        this.chartData ={
          labels: labels,
          datasets: [ {
            //@ts-ignore
            data: values,
            fill : true,
            tension : 0.5,
            borderColor : '#FFE000',
            backgroundColor : 'transparent',
            label: this.label,
            pointRadius: 0 ,
            borderWidth: 5,
            fontColor: "#000000",
          } ]
        }

        this.chartOptions = {
          elements: {
            line: {
              tension: 0.4
            }
          },
          // We use these empty structures as placeholders for dynamic theming.
          scales: {
            x: {
              grid: {
                display: false,
               }
            },
            y: {
              min: 10,
              grid:{
                color: '#000000',
                lineWidth: 2
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                boxWidth: 0,
                font: {
                  size: 20,
                }
              }
            },
            datalabels: {
              display: false,
            }
          },
        };

        // this.chartData = newChartData;
        break;
      }
      case 'pie': {
          this.chartData ={
            labels: [ 'Rent', 'Own',  ],
            datasets: [ {
              data: [ 300, 500, ],
              backgroundColor: ["#000000", "#FFE000"],
              label: this.label,
            } ]
          }

          // https://chartjs-plugin-datalabels.netlify.app/guide/formatting.html#data-transformation
          this.chartOptions = {
            plugins: {
              datalabels: {
                display: true,
                // color: 'white',
                formatter: function(value, context) {
                  const { dataset: { data } } = context;
                  // @ts-ignore
                  const total = data.reduce( (accumulator, currentValue) => accumulator + currentValue, 0 )
                  // @ts-ignore
                  return ( ( value / total ) * 100 ) + '%';
                },
                labels: {
                  title: {
                    color: 'white',
                    font: {
                      weight: 'bold',
                      size: 20,
                    }
                  },
                  value: {
                    color: 'white',
                    font: {
                      weight: 'bold',
                      size: 20,
                    }
                  }
                }
              }
              // legend: {
              //   position: 'bottom',
              //   labels:{
              //     font: {
              //       size: 20,
              //     }
              //   }
              // }

            }
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
