import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { DateRemoveEvent } from 'ngx-multiple-dates';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  // modelCall: Date[] = [];
  modelMessage: Date[] = [];
  modelMeet: Date[] = [];
  currentStep: number = 1;
  results: string[] = [];

  // FORMS
  // callMorning: FormControl = new FormControl( false, [] ); // [ formValidator ]
  // callAfternoon: FormControl = new FormControl( false, [] );
  // callEvening: FormControl = new FormControl( false, [] );

  callFormControlStep1: FormGroup =  new FormGroup( {
    callMorning: new FormControl( false, [] ),
    callAfternoon: new FormControl( false, [] ),
    callEvening: new FormControl( false, [] ),
    selectedDates: new FormControl( [], [] )
  } );

  callFormControlStep2: FormGroup =  new FormGroup( {
    firstName: new FormControl( null, [] ),
    lastName: new FormControl( null, [] ),
    email: new FormControl( null, [] ),
    phone: new FormControl( null, [] ),
    message: new FormControl( null, [] ),
    neighborhood1: new FormControl( null, [] ),
    neighborhood2: new FormControl( null, [] ),
    neighborhood3: new FormControl( null, [] ),
    neighborhood4: new FormControl( null, [] ),
    neighborhood5: new FormControl( null, [] ),
    priceRangeMin: new FormControl( null, [] ),
    priceRangeMax: new FormControl( null, [] ),
    moveDates: new FormControl( [], [] ),
    homeStyleSingleFamily: new FormControl( false, [] ),
    homeStyleTownhome: new FormControl( false, [] ),
    homeStyleCondo: new FormControl( false, [] ),
    ownershipOwn: new FormControl( false, [] ),
    ownershipRent: new FormControl( false, [] ),
  } );


  constructor( public generalService: GeneralService ) {}

  ngOnInit(): void {
    // this.generalService.tab='call;
    // this.callMorning.valueChanges.subscribe( value=> console.log(value))
    // this.callFormControl.valueChanges.subscribe( value => console.log(value))
    // this.callFormControl.valueChanges.subscribe( value => {
    //   console.log(this.callFormControl.value)
    // })
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
    console.log(this.callFormControlStep1.value, this.callFormControlStep2.value)
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

const formValidator = (formControl: FormControl ) => {
  if( formControl.value.length < 3 ){
    return { formValidator: {message: 'Error'}};
  }
  return null;
}
