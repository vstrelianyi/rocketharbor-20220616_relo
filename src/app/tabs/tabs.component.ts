import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  tabList = [ 'call', 'message', 'meet']
  selectedTab: any ;
  isAccordionOpened: any = false;
  constructor() { }

  ngOnInit(): void {
    this.selectedTab = this.tabList[1];
  }
  selectTab(tab:any){
    this.selectedTab = tab;
  }

  toggleAccordion(): void{
    this.isAccordionOpened = !this.isAccordionOpened;
  }

  dateChanged($event:any){
    console.log($event.target.value)
  }

}