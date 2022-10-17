import { Component,} from '@angular/core';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {
  isMenuOpen = false;
  constructor( public generalService: GeneralService ){
  }
  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }

}
