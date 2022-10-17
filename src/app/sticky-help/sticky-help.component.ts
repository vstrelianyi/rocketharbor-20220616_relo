import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-sticky-help',
  templateUrl: './sticky-help.component.html',
  styleUrls: ['./sticky-help.component.scss']
})
export class StickyHelpComponent implements OnInit {

  constructor( public generalService: GeneralService ) { }

  ngOnInit(): void {
  }


  btnClick( tab:any ){
    this.generalService.tab=tab;
    this.generalService.showModal=true;
  }
}
