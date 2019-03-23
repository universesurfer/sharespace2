import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeawayService } from '../homeaway.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AgmCoreModule } from '@agm/core';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public searchResults: any;
  public searchParams: object;
  private latitude: number;
  private longitude: number;



  private dataPresent: boolean;


  public resultsAndParams: Results = {
    results: this.searchResults,
    params: this.searchParams
  }

  private pageCount: number
  private currentPage: number



  constructor(
    private http: HttpClient,
    private homeAwayService: HomeawayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {

    //Query params-based search on page init
  //   this.activatedRoute.queryParams.subscribe(params => {
  //        console.log('params', params)
  //        this.resultsAndParams.params = params
  //        this.homeAwayService.searchListings(params).subscribe(res => {
  //            console.log("RESPONSE", res)
  //            this.latitude = Number(this.resultsAndParams.params.centerPointLatitude)
  //            this.longitude = Number(this.resultsAndParams.params.centerPointLongitude)
  //
  //            this.resultsAndParams.results = res["entries"]
  //            this.currentPage = res["page"]
  //            this.pageCount = res["pageCount"]
  //            this.newResults(this.resultsAndParams)
  //            console.log("response in activatedRoute in results", this.resultsAndParams)
  //            console.log("current page", this.currentPage)
  //
  //        });
  // })

}

// NOTE: map not responding to changes in url

// Update BehaviorSubject when data changes and subscribe it to local variable OnInit
 newResults(data) {
  this.dataPresent = true;
  this.homeAwayService.updateResults(data)
  console.log("newResults() function is firing")
}


//Navigate to RentalComponent
getIndividualRental(listingId) {
  console.log("the listing id", listingId)
  this.router.navigate(['/rental'],
    { queryParams: {
      listingId: listingId
    }
  })
}

showNextRentals() {

  let pageCount = this.pageCount
  let currentPage = this.currentPage
  let nextPage

  if (currentPage < pageCount) {
    nextPage = currentPage + 1
    // this.homeAwayService.navigateListingPage(nextPage)
    console.log("inside showNextRentals()", nextPage)
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: nextPage },
        queryParamsHandling: "merge"
      });

  } else {
    return false
  }

}

showPreviousRentals() {

  let pageCount = this.pageCount
  let currentPage = this.currentPage
  let previousPage

  if (currentPage > 1) {

    previousPage = currentPage - 1
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: previousPage },
        queryParamsHandling: "merge"
      });

  } else {
    return false
  }

}




}

//Interface for results to expect results and params objects
interface Results {
  results: object,
  params: object
}
