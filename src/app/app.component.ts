import { Component } from '@angular/core';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'class': 'app-root'}
})
export class AppComponent {
  title = 'app';

  constructor( public generalService: GeneralService ){
  }
}
