import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  triggerMethod = new Subject<void>();
  // showModal = true;
  showModal = false;
  tab: string | null = null;
  tabSchool: string | null = null;
  selectedDates: Date[] = [];

  callMethod() {
    this.triggerMethod.next();
  }

  constructor() { }
}
