import { Injectable } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs'
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeawayService {

  constructor(
    private http: HttpClient
  ) { }



  // .pipe(
  //         map(res => res.data) // or any other operator
  //       )
  //       .subscribe(res => console.log(res));

  searchListings(trip) {
    console.log("search listing", trip);
    const stringifiedTrip = JSON.stringify(trip)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers};
    let params = new HttpParams().set('stringifiedTrip', stringifiedTrip)

    return this.http.get('/search', options)
    .pipe(
      map((res: Response) => res.json()),
      catchError(error => Observable.throw("Error in service"))
      );
    }




}
