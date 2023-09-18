import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() onDateSelect: ( $event: any ) => void;

  constructor() {
  }

  pipe = new DatePipe('en-US');
  selected: Date | null;
  selectedDates: Date[];
  ngOnInit(): void {
    console.log( this.selectedDates );
    // this.preselectedDates = [new Date('2023-08-02'), new Date('2023-08-03')]
  }

  onDateChange( event: any): void {
    this.onDateSelect( this.selectedDates );
  }

}
