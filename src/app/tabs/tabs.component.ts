import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { DateRemoveEvent } from 'ngx-multiple-dates';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  pipe = new DatePipe('en-US');
  tabList = [ 'call', 'message', 'meet']
  isAccordionOpened: any = false;
  modelCall: Date[] = [];
  modelMessage: Date[] = [];
  modelMeet: Date[] = [];
  currentStep: number = 1;
  results: string[] = [];

  constructor( public generalService: GeneralService ) { }

  ngOnInit(): void {
    // this.generalService.tab='call;

  }
  selectTab(tab:any):void{
    this.currentStep=1;
    this.generalService.tab=tab;
  }
  changeStep( newStep: number ):void{
    this.currentStep=newStep;
  }
  toggleAccordion(): void{
    this.isAccordionOpened = !this.isAccordionOpened;
  }
  scheduleCall(): void{
    console.log('scheduleCall')
  }

  dateChanged($event:any):void{
    const date: Date = $event.value;
    const dateFormatted: string | null = this.pipe.transform(date, 'EEEE, MMMM d, y');
    dateFormatted && this.results.push( dateFormatted );
    // console.log( dateFormatted )
  }
  dateRemoved(date: DateRemoveEvent<Date>): void {
    // console.log('removed', date);
  }

}
