/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

 dateRangeValue: Date[];


 //Google Location Search
 public latitude: number;
 public longitude: number;
 public searchControl: FormControl;
 // public zoom: number;

 @ViewChild("search")
   public searchElementRef: ElementRef;

   constructor(
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone
   ) {}

   ngOnInit() {
     //set google maps defaults
     // this.zoom = 4;
     // this.latitude = 39.8282;
     // this.longitude = -98.5795;

     //create search FormControl
     this.searchControl = new FormControl();

     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
       let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
         types: ['(cities)']
       });
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();

           //verify result
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }

           //set latitude, longitude and zoom
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           // this.zoom = 12;
         });
       });
     });
   }
   }
