import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeawayService } from '../homeaway.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public searchResults: any;
  public searchParams: Object;


  private dataPresent: boolean;


  public resultsAndParams: Results = {
    results: this.searchResults,
    params: this.searchParams
  }


  constructor(
    private http: HttpClient,
    private homeAwayService: HomeawayService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    //Query params-based search on page init
    this.activatedRoute.queryParams.subscribe(params => {
         console.log('params', params)
         this.resultsAndParams.params = params
         this.homeAwayService.searchListings(params).subscribe(res => {
             this.resultsAndParams.results = res["entries"]
             this.newResults(this.resultsAndParams)
             console.log("response in activatedRoute in results", this.resultsAndParams)
         });
  })

}

// NOTE: map not responding to changes in url

// Update BehaviorSubject when data changes and subscribe it to local variable OnInit
 newResults(data) {
  this.homeAwayService.updateResults(data)
  this.dataPresent = true;
  console.log("newResults() function is firing")
}




}

//Interface for results to expect results and params objects
interface Results {
  results: Object,
  params: Object
}
