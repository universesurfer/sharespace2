import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HomeawayService } from '../homeaway.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  private results: any;

  private entries: Array<Object> = [];

  latitude: number;
  longitude: number;

  // coordinates: Array<Object> = [];

  // @Input() newResults: any;

  constructor(
    private homeAwayService: HomeawayService
  ) { }


  ngOnInit() {
    //Idea: Use map to specify data before subcribe
    //Problem:  Map not getting updated when coordinates change
    this.homeAwayService.currentResults.subscribe(results => this.results = results)
    this.latitude = Number(this.results.params.centerPointLatitude)
    this.longitude = Number(this.results.params.centerPointLongitude)
    this.entries = this.results.results
    console.log("getting current results in map Component", this.results)
    // this.getRentalCoordinatesAsNumber(this.results)
    // console.log("getting coordinates from entries", this.coordinates)
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.homeAwayService.currentResults.subscribe(results => this.results = results)
    const results: SimpleChange = changes.entries;
    console.log('prev value in map results: ', results.previousValue);
    console.log('new values in map results: ', results.currentValue);
    // this.results = results
    // this.getRentalCoordinatesAsNumber(results)
  }

  // ngOnDestroy() {
  //  //prevent memory leak when component destroyed
  //   this.results.unsubscribe();
  // }


  // getRentalCoordinatesAsNumber(results) {
  //
  //   this.results.results.forEach((element) => {
  //
  //     let elementCoordinates = {
  //       lat: Number(element.location.lat),
  //       lng: Number(element.location.lng)
  //     }
  //      this.coordinates.push(elementCoordinates)
  //
  //   } )
  // }

}
