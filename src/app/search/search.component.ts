/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { HomeawayService } from '../homeaway.service';
import { format } from 'date-fns'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

 daterangepickerModel: Date[];
 guestCount: number = 1;

 startDate: string;
 endDate: string;


 //Google Location Search
 public latitude: number;
 public longitude: number;
 public searchControl: FormControl;
 // public zoom: number;

 @ViewChild("search")
   public searchElementRef: ElementRef;

   constructor(
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,
     private homeAwayService: HomeawayService,
     private datePipe: DatePipe
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


   subtractGuest() {
     if (this.guestCount > 1) {
       this.guestCount--
     }
     console.log(this.guestCount)
   }

   addGuest() {
     this.guestCount++
     console.log(this.guestCount)
   }

   //Listen for changes in dateRangePicker.
   //Grab start and end dates and format for yyyy-MM-dd
   onValueChange(value: Date[]): void {
     this.daterangepickerModel = value
     console.log(this.daterangepickerModel);
     let dateStart = new Date(this.daterangepickerModel.slice(0, 1).toString())
     let dateEnd = new Date (this.daterangepickerModel.slice(1).toString())

     this.startDate = this.datePipe.transform(dateStart, 'yyyy-MM-dd');
     this.endDate = this.datePipe.transform(dateEnd, 'yyyy-MM-dd');
  }


   // onSearch() {
   //   const trip = {
   //     location: this.searchForm.value.location,
   //     dates: this.searchForm.value.dates,
   //     guests: this.searchForm.value.guests
   //   }
   //
   //   console.log('trip', trip);
   //       this.homeAwayService.searchParams(trip)
   //           // .subscribe(
   //           //   data => console.log(data),
   //           //   error => console.error(error)
   //           // );
   //       this.searchForm.reset();
   //   }


getHomeAwayData() {
  console.log('dates', this.startDate, this.endDate);

  const trip = {
    availabilityStart: this.startDate,
    availabilityEnd: this.endDate,
    minSleeps: this.guestCount,
    centerPointLatitude: this.latitude ,
    centerPointLongitude: this.longitude
  }

    this.homeAwayService.searchListings(trip)
  }




   }
