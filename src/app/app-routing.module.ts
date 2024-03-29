import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhyReloComponent } from './why-relo/why-relo.component';
import { WhyChicagolandComponent } from './why-chicagoland/why-chicagoland.component';
import { IllinoisLawComponent } from './illinois-law/illinois-law.component';
import { SmartSearchMapComponent } from './smart-search-map/smart-search-map.component';
import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'why-relo', component: WhyReloComponent },
  { path: 'illinois-law', component: IllinoisLawComponent },
  { path: 'why-chicagoland', component: WhyChicagolandComponent },
  { path: 'smart-search-map', component: SmartSearchMapComponent },
  { path: 'neighborhood', component: NeighborhoodComponent },
]

@NgModule({
  declarations: [],
  imports: [
    [ RouterModule.forRoot( routes,{
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 110] // [x, y]
    } )]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
