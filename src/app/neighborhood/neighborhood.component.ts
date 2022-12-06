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

  tabListSchools = [ 'tab1', 'tab2', 'tab3', 'tab4', ];

  constructor(  public generalService: GeneralService ) {}

  ngOnInit(): void {
    this.generalService.tabSchool='tab1';
  }

  selectSchoolTab(tab:any):void{
    this.generalService.tabSchool=tab;
  }

}
