import { NgModule } from "@angular/core"; // import decorator
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { BurgerComponent } from './burger/burger.component';

@NgModule( {
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    NavHeaderComponent,
    NavFooterComponent,
    BurgerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{

}
