import { Component, Input, OnInit, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})
export class ChartPieComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() data: any | null;
  @Input() label: string;

  isLoading : boolean= true;

  public pieChartLabels = ['Sales Q1', 'Sales Q2'];
  public chartDatasets = [ {
    data: [ 120, 150 ],
    backgroundColor: ["#000000", "#FFE000"],
    label: 'test'
  } ]

  public chartOptions: ChartConfiguration['options'] = {
    legend: {
      display: true,
      position: 'bottom'
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges( changes: SimpleChanges ) {
    const { data: { currentValue } } = changes;
    console.log( 'changes', currentValue)

    if( !currentValue ) return;
    this.isLoading = false;
    const labels = Object.keys( currentValue );
    const values = Object.values( currentValue ) as any[];
    this.chartDatasets[0].data = values;
  }

}
