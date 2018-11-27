import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';

import { HomeawayService } from './homeaway.service'

import { RouterModule } from "@angular/router";
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ResultsComponent } from './results/results.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { BsDatepickerModule, BsDropdownModule, ButtonsModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ResultsComponent,
    MapComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ["places"]
    })
  ],
  providers: [DatePipe, HomeawayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
