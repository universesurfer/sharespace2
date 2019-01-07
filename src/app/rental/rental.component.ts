'use strict';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeawayService } from '../homeaway.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
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
  // private features: Array<object>;

  private features: FeatureList = {
    general: [],
    kitchen: [],
    entertainment: [],
    suitability: [],
    outside: []
  }

  private reviews: Reviews = {
    reviewSummary: {},
    reviews: []
  }

  private currentPageArray: array<object> = []

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.currentPageArray = this.reviews.reviews.slice(startItem, endItem);
  }

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
             this.getFeatureByCategory(res.units[0].unitContent.features)
             this.reviews.reviewSummary = res.units[0].reviewSummary
             this.reviews.reviews = res.units[0].unitReviewContent.entries
             this.listingDetails = res
             this.currentPageArray = this.reviews.reviews.slice(0, 10);
             console.log("response in activatedRoute in rental details", res)
             console.log("reviews", this.reviews)
             console.log("coordinates", this.coordinates)
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



//Create New Object with Separated Listing Features By Category
getFeatureByCategory(features) {

  features.forEach((feature) {

    let featureCategory = feature.category
    switch (featureCategory) {
      case "GENERAL":
         this.features.general.push(feature)
         break;
      case "KITCHEN":
          this.features.kitchen.push(feature)
          break;
      case "ENTERTAINMENT":
          this.features.entertainment.push(feature)
          break;
      case "SUITABILITY":
          this.features.suitability.push(feature)
          break;
      case "OUTSIDE":
          this.features.outside.push(feature)

      }
  })
  console.log("Showing feature list", this.features)
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

interface FeatureList {
  general: [],
  kitchen: [],
  entertainment: [],
  suitability: [],
  outside: []
}

interface Reviews {
  reviewSummary: {},
  reviews: []
}
