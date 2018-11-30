import { Injectable } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Rx from "rxjs";
import 'rxjs'
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// IDEA: Cache data from API to prevent repeated calls

@Injectable({
  providedIn: 'root'
})
export class HomeawayService {

  //HomeAway API Data
  public rentals: Object;
  // private homeAwayResults = new Rx.BehaviorSubject({});
  // currentListings = this.homeAwayResults.asObservable();


  //BehaviorSubject captures new coordinates from search to provide map component
  private resultsCoordinates = new Rx.BehaviorSubject({});
  currentCoordinates = this.resultsCoordinates.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  // Method updates coordinates from search for map from results component
  changeCoordinates(coordinates: Object) {
    this.resultsCoordinates.next(coordinates)
  }


  //Search HomeAway Listings
  searchListings(trip) {
    console.log("search listing", trip)
    // const stringifiedParams = JSON.stringify(trip)

    //Grab all of the params from the trip argument and append them to params variable
    let params = new HttpParams()
    Object.keys(trip).forEach(function (key) {
     params = params.append(key, trip[key]);
    });

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

    const options = {
      headers: headers,
      params: params
    }

    return this.http.get(`/homeaway/search`, options)
    .pipe(
      map((res: Response) => res),
      catchError(error => throwError(error.message || error))
      )
      // .subscribe(res => console.log(res.json()))


  }


  // retrieveRentalsFromService(rentals: Object) {
  //   this.homeAwayResults.next(rentals)
  //   console.log("getting rentals from retrieve function in service", this.homeAwayResults)
  // }




}
