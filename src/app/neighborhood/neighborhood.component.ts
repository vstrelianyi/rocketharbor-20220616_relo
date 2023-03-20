import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { DatePipe, ViewportScroller  } from '@angular/common';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeighborhoodComponent implements OnInit {
  tabListSchools = [ 'tab1', 'tab2', 'tab3', 'tab4', ];
  chartData = null;

  constructor(
    public generalService: GeneralService,
    private viewportScroller: ViewportScroller,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.generalService.tabSchool='tab1';

    const apiURL = 'https://www.deltamediagroup.com/Feeds/market_stats_feed.php?key=c49c3f42f45aff78f3f71b4741360cb9';
    this.http.get(apiURL)
    .subscribe( ( res ): any => {
      if(res){
        // @ts-ignore
        this.chartData = res?.market_stats;
        console.log( this.chartData );
        // res?.market_stats?.forEach( (stat):any => this.data.push( stat ) )
      }
    });
  }

  selectSchoolTab(tab:any):void{
    this.generalService.tabSchool=tab;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
}

}
