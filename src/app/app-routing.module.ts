import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhyReloComponent } from './why-relo/why-relo.component';
import { IllinoisLawComponent } from './illinois-law/illinois-law.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'why-relo', component: WhyReloComponent },
  { path: 'illinois-law', component: IllinoisLawComponent },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot( routes )]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
