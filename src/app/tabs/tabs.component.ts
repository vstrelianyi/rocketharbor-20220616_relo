import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  tabList = [ 'call', 'message', 'meet']
  isAccordionOpened: any = false;

  constructor( public generalService: GeneralService ) { }

  ngOnInit(): void {
    // this.generalService.tab='call;
  }
  selectTab(tab:any){
    this.generalService.tab=tab;
  }

  toggleAccordion(): void{
    this.isAccordionOpened = !this.isAccordionOpened;
  }

  dateChanged($event:any){
    console.log($event.target.value)
  }

}
