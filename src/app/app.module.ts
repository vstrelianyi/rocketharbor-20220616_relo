import { NgModule } from "@angular/core"; // import decorator
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { BurgerComponent } from './burger/burger.component';
import { WhyReloComponent } from './why-relo/why-relo.component';
import { IllinoisLawComponent } from './illinois-law/illinois-law.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { StickyHelpComponent } from './sticky-help/sticky-help.component';
import { SmartSearchMapComponent } from './smart-search-map/smart-search-map.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { WhyChicagolandComponent } from './why-chicagoland/why-chicagoland.component';

@NgModule( {
  imports: [ BrowserModule, AppRoutingModule, NgSelectModule,FormsModule ],
  declarations: [
    AppComponent,
    NavHeaderComponent,
    NavFooterComponent,
    BurgerComponent,
    WhyReloComponent,
    IllinoisLawComponent,
    HomeComponent,
    StickyHelpComponent,
    SmartSearchMapComponent,
    WhyChicagolandComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{

}
