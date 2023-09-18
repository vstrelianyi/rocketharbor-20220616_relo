import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GeneralService } from 'public/services/general/general.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ContactDto, ContactUsDto, ContactUsServiceProxy, LeadRoutingServiceProxy, OfficeLocationListDto, SheduleDataDto } from '@shared/service-proxies/service-proxies';
import { NavigationEnd, Router } from '@angular/router';
import { DateTime } from 'luxon';

import { Subscription } from 'rxjs';
import { RecommendedOfficeService } from 'public/services/offices/recommended-office.service';


// import { IDatePickerConfig } from 'ng2-date-picker';
// import { DateRemoveEvent } from 'ngx-multiple-dates';

// import { JsonPipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
// import { DATE } from 'ngx-bootstrap/chronos/units/constants';

// https://ng-bootstrap.github.io/releases/14.x/#/components/datepicker/overview
// https://v14.material.angular.io/components/datepicker/overview

@Component( {
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TabsComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;

  recommendedOfficeSubscription: Subscription;
  recommendedOffice: OfficeLocationListDto;

  WORKING_HOURS_START = 9;
  WORKING_HOURS_END = 17;

  constructor(
    public generalService: GeneralService,
    public contactUsServiceProxy: ContactUsServiceProxy,
    public leadRoutingServiceProxy: LeadRoutingServiceProxy,
    public readonly recommendedOfficeService: RecommendedOfficeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.recommendedOfficeSubscription =
      this.recommendedOfficeService.recommendedOffice$
        .subscribe(data => this.recommendedOffice = data);

    this.onDateSelect = this.onDateSelect.bind(this);
  }

  pipe = new DatePipe('en-US');

  tabList = [ 'call', 'message', 'meet'];

  isAccordionOpened: any = false;
  currentStep: number = 1;
  // formSelectedDates: Date[] = [ new Date('2023-08-03 00:00:00'), new Date('2023-08-04 00:00:00') ];
  formSelectedDatesCall: Date[] = [];
  formSelectedDatesMeet: Date[] = [];

  callFormControlStep1: FormGroup;
  callFormControlStep2: FormGroup;
  messageFormControlStep1: FormGroup;
  meetFormControlStep1: FormGroup;
  meetFormControlStep2: FormGroup;
  contactCellPhone: string;

  isWorkingHours = false;

  selectedCheckboxes: number = 0;

  ngOnInit(): void {
    this.checkIsWorkingHours();
    this.initForms();

    this.subscription = this.generalService.triggerMethod.subscribe(() => {
      // console.log('Modal closed event');
      this.generalService.selectedDates = [];
      this.clearForm();
    });

  }

  ngAfterViewInit(): void {
    this.getContactPhone();
  }

  ngOnDestroy() {
    this.recommendedOfficeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  checkIsWorkingHours() {
    const today = DateTime.utc().setZone("CST");
    var currentHour = today.hour;

    this.isWorkingHours = this.WORKING_HOURS_START <= currentHour && currentHour <= this.WORKING_HOURS_END && today.weekday != 6 && today.weekday != 7;
  }

  getContactPhone() {
    this.leadRoutingServiceProxy.getAll().subscribe(data => {
      this.contactCellPhone = data
        .filter(i => (i.page1 == this.generalService.currentUrl && (i.page2 == undefined || i.page2 == null))
                  || (i.page1 == this.generalService.previousUrl && i.page2 == this.generalService.currentUrl))
      .map(i => i.phoneNumber)[0];
    });

  }

  initForms() {
    // CALL FORM
    this.callFormControlStep1 = new FormGroup( {
      callMorning: new FormControl( false, [] ),
      callAfternoon: new FormControl( false, [] ),
      callEvening: new FormControl( false, [] ),
      selectedDates: new FormControl( [], [] )
    } );
    this.callFormControlStep1.setValidators(limitCheckboxSelection(2));

    this.callFormControlStep2 = new FormGroup( {
      firstName: new FormControl( null, [] ),
      lastName: new FormControl( null, [] ),
      email: new FormControl( null, [] ),
      phone: new FormControl( null, [] ),
      message: new FormControl( null, [] ),
    } );

    // MESSAGE FORM
    this.messageFormControlStep1 = new FormGroup( {
      firstName: new FormControl( null, [] ),
      lastName: new FormControl( null, [] ),
      email: new FormControl( null, [] ),
      phone: new FormControl( null, [] ),
      contactMethodTexting: new FormControl( false, [] ),
      contactMethodEmail: new FormControl( false, [] ),
      message: new FormControl( '', [] ),
    } );

    // MEET FORM
    this.meetFormControlStep1 = new FormGroup ( {
      callMorning: new FormControl( false, [] ),
      callAfternoon: new FormControl( false, [] ),
      callEvening: new FormControl( false, [] ),
      selectedDates: new FormControl( [], [] )
    }, );
    this.meetFormControlStep1.setValidators(limitCheckboxSelection(2));

    this.meetFormControlStep2 = new FormGroup( {
      firstName: new FormControl( null, [] ),
      lastName: new FormControl( null, [] ),
      email: new FormControl( null, [] ),
      phone: new FormControl( null, [] ),
      contactMethodTexting: new FormControl( false, [] ),
      contactMethodPhone: new FormControl( false, [] ),
      contactMethodEmail: new FormControl( false, [] ),
      message: new FormControl( '', [] ),
    } );


    // this.callFormControlStep1.valueChanges.subscribe(newValue => {
    //   console.log('callFormControlStep1 New value:', newValue);
    // });
    // this.meetFormControlStep1.valueChanges.subscribe(newValue => {
    //   console.log('meetFormControlStep1 New value:', newValue);
    // });

    // this.formSelectedDatesCall = this.callFormControlStep1.get('selectedDates').value;
    // this.formSelectedDatesMeet = this.meetFormControlStep1.get('selectedDates').value;
  }

  selectTab(tab:any):void{
    this.selectedCheckboxes = 0;
    this.currentStep=1;
    this.generalService.tab=tab;
    this.isAccordionOpened=false;
  }

  changeStep( newStep: number ):void{
    // if (newStep === 2) {
    //   const hasValidationError = this.meetFormControlStep1.hasError('tooManySelected');
    //   if (hasValidationError) {
    //     this.meetFormControlStep1.patchValue({
    //       callMorning: false,
    //       callAfternoon: false,
    //       callEvening: false,
    //     });
    //   }
    // }
    this.selectedCheckboxes = 0;
    this.currentStep=newStep;
  }

  toggleAccordion(): void{
    this.isAccordionOpened = !this.isAccordionOpened;
  }


  onDateSelect( dates: Date[] ){
    // console.log( 'Form selectedDates', dates );

    this.callFormControlStep1.patchValue({
      selectedDates: dates // Assuming you have date values here
    });

    this.meetFormControlStep1.patchValue({
      selectedDates: dates // Assuming you have date values here
    });

    this.generalService.selectedDates = dates;

    // const formattedDate = this.pipe.transform(  this.callFormControlStep1.get('selectedDates').value, 'yyyy-MM-dd');
    // console.log(formattedDate);

  }

  clearForm(): void {
    this.callFormControlStep1.reset();
    this.callFormControlStep2.reset();
    this.messageFormControlStep1.reset();
    this.meetFormControlStep1.reset();
    this.meetFormControlStep2.reset();
  }

  getFormValues(): void{
    // const selectedDates = this.callFormControlStep1.get('selectedDates').value;
  }

  clearMeetFormCheckboxes() {
    // if (this.meetFormControlStep1.hasError('tooManySelected')) {
    //   this.meetFormControlStep1.patchValue({
    //     callMorning: false,
    //     callAfternoon: false,
    //     callEvening: false,
    //   });
    // }
  }

  // updateCheckboxSelection(checkboxName: string) {
  //   const checkboxControlCall = this.callFormControlStep1.get(checkboxName);
  //   if( this.generalService.tab === 'call'){
  //     if (checkboxControlCall) {
  //       if (checkboxControlCall.value) {
  //         this.selectedCheckboxes++;
  //       } else {
  //         this.selectedCheckboxes--;
  //       }

  //       if (this.selectedCheckboxes >= 2) {
  //         if( !this.callFormControlStep1.get('callMorning').value ){
  //           this.callFormControlStep1.get('callMorning').disable();
  //         }
  //         if( !this.callFormControlStep1.get('callAfternoon').value ){
  //           this.callFormControlStep1.get('callAfternoon').disable();
  //         }
  //         if( !this.callFormControlStep1.get('callEvening').value ){
  //           this.callFormControlStep1.get('callEvening').disable();
  //         }
  //         ;
  //       } else {
  //         this.callFormControlStep1.get('callEvening').enable();
  //         this.callFormControlStep1.get('callAfternoon').enable();
  //         this.callFormControlStep1.get('callMorning').enable();
  //       }
  //     }

  //     this.meetFormControlStep1.get('callMorning').setValue(this.callFormControlStep1.get('callMorning').value);
  //     this.meetFormControlStep1.get('callAfternoon').setValue(this.callFormControlStep1.get('callAfternoon').value);
  //     this.meetFormControlStep1.get('callEvening').setValue(this.callFormControlStep1.get('callEvening').value);
  //   }

  //   const checkboxControlMeet = this.meetFormControlStep1.get(checkboxName);
  //   if( this.generalService.tab === 'meet'){
  //     if (checkboxControlMeet) {
  //       if (checkboxControlMeet.value) {
  //         this.selectedCheckboxes++;
  //       } else {
  //         this.selectedCheckboxes--;
  //       }
  //       if (this.selectedCheckboxes >= 2) {
  //         if( !this.meetFormControlStep1.get('callMorning').value ){
  //           this.meetFormControlStep1.get('callMorning').disable();
  //         }
  //         if( !this.meetFormControlStep1.get('callAfternoon').value ){
  //           this.meetFormControlStep1.get('callAfternoon').disable();
  //         }
  //         if( !this.meetFormControlStep1.get('callEvening').value ){
  //           this.meetFormControlStep1.get('callEvening').disable();
  //         }
  //         ;
  //       } else {
  //         this.meetFormControlStep1.get('callEvening').enable();
  //         this.meetFormControlStep1.get('callAfternoon').enable();
  //         this.meetFormControlStep1.get('callMorning').enable();
  //       }
  //     }

  //     this.callFormControlStep1.get('callMorning').setValue(this.meetFormControlStep1.get('callMorning').value);
  //     this.callFormControlStep1.get('callAfternoon').setValue(this.meetFormControlStep1.get('callAfternoon').value);
  //     this.callFormControlStep1.get('callEvening').setValue(this.meetFormControlStep1.get('callEvening').value);
  //   }
  // }

  sendForm( formName: string ): void{
    const data = new ContactUsDto({
      recommendedOffice: this.recommendedOffice.title,
      recommendedOfficeAgent: this.recommendedOffice.headshotName,
      previousPage: this.generalService.previousUrl,
      currentPage: this.generalService.currentUrl,
      contact: new ContactDto({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        message: '',
        contactMethodPhone: false,
        contactMethodEmail: false,
        contactMethodTexting: false,
      }),
      event: formName,
      sheduleData: new SheduleDataDto({
        selectedDates: new Array(),
        callMorning: false,
        callEvening: false,
        callAfternoon: false,
      })
    });

    switch (formName) {
      case 'callForm':
        {
          var callFormDataStep1 = this.callFormControlStep1.value;
          var callFormDataStep2 = this.callFormControlStep2.value;

          data.sheduleData.callMorning = callFormDataStep1.callMorning;
          data.sheduleData.callAfternoon = callFormDataStep1.callAfternoon;
          data.sheduleData.callEvening = callFormDataStep1.callEvening;

          if (Array.isArray(callFormDataStep1.selectedDates)) {
            data.sheduleData.selectedDates = [] as any;
            for (let item of callFormDataStep1.selectedDates)
              data.sheduleData.selectedDates!.push(DateTime.fromJSDate(item));
          }

          data.contact.firstName = callFormDataStep2.firstName;
          data.contact.lastName = callFormDataStep2.lastName;
          data.contact.email = callFormDataStep2.email;
          data.contact.phone = callFormDataStep2.phone;
          data.contact.message = callFormDataStep2.message;
        }
        break;
      case 'messageForm':
        {
          var messageFormDataStep1 = this.messageFormControlStep1.value;

          data.contact.firstName = messageFormDataStep1.firstName;
          data.contact.lastName = messageFormDataStep1.lastName;
          data.contact.email = messageFormDataStep1.email;
          data.contact.phone = messageFormDataStep1.phone;
          data.contact.message = messageFormDataStep1.message;
          data.contact.contactMethodTexting = messageFormDataStep1.contactMethodTexting != undefined ? messageFormDataStep1.contactMethodTexting : false;
          data.contact.contactMethodPhone = messageFormDataStep1.contactMethodPhone != undefined ? messageFormDataStep1.contactMethodPhone : false;
          data.contact.contactMethodEmail = messageFormDataStep1.contactMethodEmail != undefined ? messageFormDataStep1.contactMethodEmail : false;
        }
        break;
      case 'meetForm':
        {
          var meetFormDataStep1 = this.meetFormControlStep1.value;
          var meetFormDataStep2 = this.meetFormControlStep2.value;

          data.sheduleData.callMorning = meetFormDataStep1.callMorning;
          data.sheduleData.callAfternoon = meetFormDataStep1.callAfternoon;
          data.sheduleData.callEvening = meetFormDataStep1.callEvening;

          if (Array.isArray(meetFormDataStep1.selectedDates)) {
            data.sheduleData.selectedDates = [] as any;
            for (let item of meetFormDataStep1.selectedDates)
              data.sheduleData.selectedDates!.push(DateTime.fromJSDate(item));
          }

          data.contact.firstName = meetFormDataStep2.firstName;
          data.contact.lastName = meetFormDataStep2.lastName;
          data.contact.email = meetFormDataStep2.email;
          data.contact.phone = meetFormDataStep2.phone;
          data.contact.message = meetFormDataStep2.message;
          data.contact.contactMethodTexting = meetFormDataStep2.contactMethodTexting != undefined ? meetFormDataStep2.contactMethodTexting : false;
          data.contact.contactMethodPhone = meetFormDataStep2.contactMethodPhone != undefined ? meetFormDataStep2.contactMethodTexting : false;
          data.contact.contactMethodEmail = meetFormDataStep2.contactMethodEmail != undefined ? meetFormDataStep2.contactMethodTexting : false;
        }
        break;
      default:
        break;
    }

    this.contactUsServiceProxy.send(data).subscribe(s => {
      this.clearForm();
      this.generalService.showModal=false;
    });
  }

}

const formValidator = (formControl: FormControl ) => {
  if( formControl.value.length < 3 ){
    return { formValidator: {message: 'Error'}};
  }
  return null;
}

function limitCheckboxSelection(maxSelections: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedCount = Object.values(control.value).filter((value) => value === true).length;

    if (selectedCount >= maxSelections) {
      return { tooManySelected: true };
    }

    return null;
  };
}
