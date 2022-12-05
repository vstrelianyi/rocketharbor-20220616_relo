import { NgModule } from "@angular/core"; // import decorator
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { BurgerComponent } from './burger/burger.component';
import { WhyReloComponent } from './why-relo/why-relo.component';
import { IllinoisLawComponent } from './illinois-law/illinois-law.component';
import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { StickyHelpComponent } from './sticky-help/sticky-help.component';
import { SmartSearchMapComponent } from './smart-search-map/smart-search-map.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { WhyChicagolandComponent } from './why-chicagoland/why-chicagoland.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MATERIAL DESIGN
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatNativeDateModule } from '@angular/material/core';

// import { NgxMultipleDatesModule, } from 'ngx-multiple-dates';

import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule( {
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,

    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    DpDatePickerModule
    // MatDatepickerModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    // NgxMultipleDatesModule
  ],
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
    ModalComponent,
    TabsComponent,
    NeighborhoodComponent,
  ],
  providers: [
    // MatDatepickerModule,
    // MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule{

}
