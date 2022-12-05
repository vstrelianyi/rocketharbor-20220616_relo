import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  // showModal = true;
  showModal = false;
  tab: string | null = null;
  tabSchool: string | null = null;
  constructor() { }
}
