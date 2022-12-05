import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.component.html',
  styleUrls: ['./neighborhood.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeighborhoodComponent implements OnInit {

  tabList = [ 'Market Trends', 'Demographics', 'Schools', 'Educations', 'Rent vs. Own', 'Local Businesses' ];

  tabListSchools = [ 'tab1', 'tab2', 'tab3', 'tab4', ];

  constructor(  public generalService: GeneralService ) {}

  ngOnInit(): void {
    this.generalService.tab='Schools';
    this.generalService.tabSchool='tab1';
  }

  selectTab(tab:any):void{
    this.generalService.tab=tab;
  }

  selectSchoolTab(tab:any):void{
    this.generalService.tabSchool=tab;
  }

}
