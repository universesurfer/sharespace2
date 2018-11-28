import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HomeawayService } from '../homeaway.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  coordinates: any = {
    latitude: Number,
    longitude: Number
  };

  latitude: Number;
  longitude: Number;

  constructor(
    private homeAwayService: HomeawayService
  ) { }

  ngOnInit() {

    this.homeAwayService.currentCoordinates.subscribe(coordinates => this.coordinates = coordinates)
    this.latitude = this.coordinates.latitude
    this.longitude = this.coordinates.longitude
    console.log("getting current coordinates", this.coordinates)
  }

  // latitude = 51.678418
  // longitude = 7.809007

}
