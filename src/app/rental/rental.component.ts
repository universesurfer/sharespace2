'use strict';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeawayService } from '../homeaway.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
// import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit, AfterViewChecked {

  listingDetails: any;
  private photos: Array<object>;
  private coordinates: object;
  private features: Array<object>;

  private objectKeys = Object.keys

  objectKeys = Object.keys;
  items = { keyOne: 'value 1', keyTwo: 'value 2', keyThree: 'value 3' };

  activeSlideIndex = 0; //Start slideshow at first photo
  myInterval = 0; //Turns off auto scrolling

  isCollapsed: boolean = true;
  textExceedsDivHeight: boolean = false;

  constructor(
    private http: HttpClient,
    private homeAwayService: HomeawayService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {

    //Query params-based search on page init
    this.activatedRoute.queryParams.subscribe(listingId => {
         console.log('rental detail params', listingId)
         this.homeAwayService.getListingDetails(listingId).subscribe(res => {
             this.photos = res.photos.photos
             this.coordinates = res.location
             this.features = res.units[0].unitContent.features
             this.listingDetails = res
             console.log("response in activatedRoute in rental details", res)
         });
    })



  }

  ngAfterViewChecked() {
    this.showToggleButtons()
  }


showToggleButtons() {
  let descriptionText = document.getElementById("description-text").innerHTML
  console.log(descriptionText.length)
  if (descriptionText.length > 500) {
    this.textExceedsDivHeight = true
  } else {
    this.textExceedsDivHeight = false
  }
}


toggleText() {
  this.isCollapsed ? this.expand() : this.collapse()
}

collapse() {
  this.isCollapsed = true
  const descriptionElement = document.getElementById("listing-description")
  descriptionElement.style.overflow = "hidden"
  descriptionElement.style.height = "250px"
}

expand() {
  this.isCollapsed = false
  const descriptionElement = document.getElementById("listing-description")
  descriptionElement.style.height = "auto"
}
// toggleDescription() {
//   const descriptionElement = document.getElementById("listing-description")
//   const viewMoreButton = document.getElementById("view-more")
//   const viewLessButton = document.getElementById("view-less")
//
//   if (descriptionElement.style.overflow = "hidden") {
//     descriptionElement.style.overflow = "visible"
//     viewLessButton.style.display = "inline"
//     viewMoreButton.style.display = "none"
//   }
//   else if (descriptionElement.style.overflow = "visible") {
//     descriptionElement.style.overflow = "hidden"
//     viewMoreButton.style.display = "inline"
//     viewLessButton.style.display = "none"
//
//   }
// }





}
