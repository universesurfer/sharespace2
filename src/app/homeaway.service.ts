import { Injectable } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs'
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeawayService {

   BASE_URL: string = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }



  // .pipe(
  //         map(res => res.data) // or any other operator
  //       )
  //       .subscribe(res => console.log(res));

  searchListings(trip) {
    console.log("search listing", trip)
    const stringifiedParams = JSON.stringify(trip)

    let params = new HttpParams()
    Object.keys(trip).forEach(function (key) {
     params = params.append(key, trip[key]);
    });

    // .set('availabilityStart', trip.availabilityStart)
    // .set('availabilityEnd', trip.availabilityEnd)
    // .set('minSleeps', trip.minSleeps)
    // .set('centerPointLatitude', trip.centerPointLatitude)
    // .set('centerPointLongitude', trip.centerPointLongitude)

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

    const options = {
      headers: headers,
      params: params
    }

    return this.http.get(`/homeaway/search`, options)
    .pipe(
      map((res: Response) => res.json()),
      catchError(error => throwError(error.message || error))
      )

  }




}
