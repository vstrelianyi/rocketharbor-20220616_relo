// @ts-nocheck

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { DatePipe, ViewportScroller  } from '@angular/common';

import {HttpClient} from '@angular/common/http';

interface IResData {
  company_id: number,
  key_name: string,
  status: string,
  market_stats: any[]
}

@Component( {
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )

export class NeighborhoodComponent implements OnInit {
  tabListSchools = [ 'tab1', 'tab2', 'tab3', 'tab4', ];
  data = null;
  isLoadingData = true;
  schoolsCount = 0;
  preSchoolsCount = 0;
  elementarySchoolsCount = 0;
  middleSchoolsCount = 0;
  highSchoolsCount = 0;


  constructor(
    public generalService: GeneralService,
    private viewportScroller: ViewportScroller,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.generalService.tabSchool='tab2';

    const apiURL = 'https://www.deltamediagroup.com/Feeds/market_stats_feed.php?key=c49c3f42f45aff78f3f71b4741360cb9';
    this.http.get(apiURL)
    .subscribe( ( res ): IResData | null => {
      if(res){
        // @ts-ignore
        this.data = res?.market_stats;
        this.isLoadingData = false;

        // console.log( this?.data[ 1 ]?.schools );
        this.preSchoolsCount =  this?.data[ 1 ]?.schools?.pre?.length;
        this.elementarySchoolsCount =  this?.data[ 1 ]?.schools?.elementary?.length;
        this.middleSchoolsCount =  this?.data[ 1 ]?.schools?.middle?.length;
        this.highSchoolsCount =  this?.data[ 1 ]?.schools?.high?.length;
        return res;
        // res?.market_stats?.forEach( (stat):any => this.data.push( stat ) )
      }
      return null;
    });
  }

  selectSchoolTab(tab:any):void{
    this.generalService.tabSchool=tab;
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
