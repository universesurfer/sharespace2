import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HomeawayService } from '../homeaway.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private results: any;

  latitude: number;
  longitude: number;

  coordinates: Array<Object> = [];

  // coordinates: Array<Object> = [
  //   {lat: Number(38.7586516), lng: Number(-91.0777323)},
  //   {lat: 41.6863477, lng: -86.2302803}
  //   // {lat: 39.5055005, lng: 2.7539709}
  // ]



  constructor(
    private homeAwayService: HomeawayService
  ) { }


  ngOnInit() {
    //Idea: Use map to specify data before subcribe
    //Problem:  Map not getting updated when coordinates change
    this.homeAwayService.currentResults.subscribe(results => this.results = results)
    this.latitude = Number(this.results.params.centerPointLatitude)
    this.longitude = Number(this.results.params.centerPointLongitude)
    console.log("getting current results in map Component", this.results)
    this.getRentalCoordinatesAsNumber(this.results)
    console.log("getting coordinates from entries", this.coordinates)
  }



  getRentalCoordinatesAsNumber(results) {

    this.results.results.forEach((element) => {

      let elementCoordinates = {
        lat: Number(element.location.lat),
        lng: Number(element.location.lng)
      }
       this.coordinates.push(elementCoordinates)

    } )
  }

}

// interface Marker {
//   lat: Number,
//   lng: Number
// }
