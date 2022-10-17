import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor( public generalService: GeneralService ){
  }
  ngOnInit(): void {
  }

  closeModal(): void{
    this.generalService.showModal = false;
  }
}
