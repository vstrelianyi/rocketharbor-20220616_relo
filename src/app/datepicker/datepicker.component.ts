import { Component, OnInit, Input, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MatCalendarCellCssClasses,
  MatCalendar
} from '@angular/material/datepicker';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() onDateSelect: ( $event: any ) => void;
  @Input() preSelectedDates: Date[];
  @ViewChild('picker') picker: MatCalendar<Date>;

  pipe = new DatePipe('en-US');
  selected: Date | null;
  selectedDates: Date[];

  constructor(
    public generalService: GeneralService,
    public cdr: ChangeDetectorRef,
  ) {
    // this.selectedDates = [ new Date('2023-08-03 00:00:00'), new Date('2023-08-04 00:00:00') ];
    // this.selectDate( new Date('2023-08-03 00:00:00') );
  }

  ngOnInit(): void {
    // this.selectedDates = this.preSelectedDates;

    this.selectedDates = this.generalService.selectedDates
    // console.log( this.generalService.selectedDates );
    // console.log( this.selectedDates );
  }

  dateClassMethod() {
    return ( currentDate: Date): MatCalendarCellCssClasses => {
      let classToReturn = '';

      const isDateInArray =this.selectedDates?.some( selectedDate => {
        // console.log( selectedDate.getTime() === currentDate.getTime(), selectedDate, currentDate );
        return selectedDate.getTime() === currentDate.getTime();
      } );
      if( isDateInArray ){
        classToReturn = 'selected';
      }

      return classToReturn;
    }
  }

  onDateChange( event: any): void {
    // console.log( 'datepicker: dateClicked:', event );
    this.onDateSelect( this.selectedDates );
    // this.dateClass();
    setTimeout(() => { this.picker.updateTodaysDate(); }, 100);
  }

}
