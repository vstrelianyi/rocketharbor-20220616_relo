import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhyReloComponent } from './why-relo/why-relo.component';
import { IllinoisLawComponent } from './illinois-law/illinois-law.component';
import { SmartSearchMapComponent } from './smart-search-map/smart-search-map.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'why-relo', component: WhyReloComponent },
  { path: 'illinois-law', component: IllinoisLawComponent },
  { path: 'smart-search-map', component: SmartSearchMapComponent },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot( routes )]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
