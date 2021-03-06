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
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StarRatingModule } from 'angular-star-rating';

import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { RentalComponent } from './rental/rental.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ResultsComponent,
    MapComponent,
    SearchComponent,
    RentalComponent,
    NavComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    routing,
    BsDatepickerModule.forRoot(),
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ["places"]
    })
  ],
  providers: [DatePipe, HomeawayService, Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
