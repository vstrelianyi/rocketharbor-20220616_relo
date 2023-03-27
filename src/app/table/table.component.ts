import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() rows: string[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges( changes: SimpleChanges ) {
    const { rows: { currentValue } } = changes;
    console.log(currentValue)
  }

}
