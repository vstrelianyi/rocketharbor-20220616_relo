import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { DateRemoveEvent } from 'ngx-multiple-dates';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TabsComponent implements OnInit {
  private subscription: Subscription;
  tabList = [ 'call', 'message', 'meet'];

  isAccordionOpened: any = false;
  currentStep: number = 1;

  formSelectedDatesCall: Date[] = [];
  formSelectedDatesMeet: Date[] = [];

  callFormControlStep1: FormGroup;
  callFormControlStep2: FormGroup;
  messageFormControlStep1: FormGroup;
  meetFormControlStep1: FormGroup;
  meetFormControlStep2: FormGroup;

  pipe = new DatePipe('en-US');

  // FORMS
  // callMorning: FormControl = new FormControl( false, [] ); // [ formValidator ]
  // callAfternoon: FormControl = new FormControl( false, [] );
  // callEvening: FormControl = new FormControl( false, [] );

  // CALL FORM
  initForms() {
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

    // MESSAGE FORM
    messageFormControlStep1: FormGroup =  new FormGroup( {
      firstName: new FormControl( null, [] ),
      lastName: new FormControl( null, [] ),
      email: new FormControl( null, [] ),
      phone: new FormControl( null, [] ),
      contactMethodTexting: new FormControl( null, [] ),
      contactMethodEmail: new FormControl( null, [] ),
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

    // MEET FORM
    meetFormControlStep1: FormGroup =  new FormGroup( {
      callMorning: new FormControl( false, [] ),
      callAfternoon: new FormControl( false, [] ),
      callEvening: new FormControl( false, [] ),
      selectedDates: new FormControl( [], [] )
    } );

    meetFormControlStep2: FormGroup =  new FormGroup( {
      firstName: new FormControl( null, [] ),
      lastName: new FormControl( null, [] ),
      email: new FormControl( null, [] ),
      phone: new FormControl( null, [] ),
      contactMethodTexting: new FormControl( null, [] ),
      contactMethodEmail: new FormControl( null, [] ),
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
  }

  constructor( public generalService: GeneralService ) {}

  ngOnInit(): void {
    // this.generalService.tab='call;
    // this.callMorning.valueChanges.subscribe( value=> console.log(value))
    // this.callFormControl.valueChanges.subscribe( value => console.log(value))
    // this.callFormControl.valueChanges.subscribe( value => {
    //   console.log(this.callFormControl.value)
    // })

    this.initForms();

    this.subscription = this.generalService.triggerMethod.subscribe(() => {
      // console.log('Modal closed event');
      this.generalService.selectedDates = [];
      this.clearForm();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectTab(tab:any):void{
    this.currentStep=1;
    this.generalService.tab=tab;
    this.isAccordionOpened=false;
  }

  changeStep( newStep: number ):void{
    this.currentStep=newStep;
  }

  toggleAccordion(): void{
    this.isAccordionOpened = !this.isAccordionOpened;
  }

  sendForm( formName: string ): void{
    switch (formName) {
      case 'callForm':
        console.log( 'callForm', this.callFormControlStep1.value, this.callFormControlStep2.value )
        break;
      case 'messageForm':
        console.log( 'messageForm', this.messageFormControlStep1.value)
        break;
      case 'meetForm':
        console.log( 'meetForm', this.meetFormControlStep1.value, this.meetFormControlStep2.value)
        break;
      default:
        break;
    }

  }

  onSelect( $event: any){
    // console.log($event, this.callFormControlStep1.value.selectedDates )
    // const datesLength = this.callFormControlStep1.value.selectedDates.length;
    // if( datesLength > 2){
    // }
  }

  clearForm(): void {
    this.callFormControlStep1.reset();
    this.callFormControlStep2.reset();
    this.messageFormControlStep1.reset();
    this.meetFormControlStep1.reset();
    this.meetFormControlStep2.reset();
  }

  // dateChanged($event:any):void{
  //   const date: Date = $event.value;
  //   const dateFormatted: string | null = this.pipe.transform(date, 'EEEE, MMMM d, y');
  //   dateFormatted && this.results.push( dateFormatted );
  // }
  // dateRemoved(date: DateRemoveEvent<Date>): void {
    // console.log('removed', date);
  // }

}

const formValidator = (formControl: FormControl ) => {
  if( formControl.value.length < 3 ){
    return { formValidator: {message: 'Error'}};
  }
  return null;
}
