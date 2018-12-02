import { Component, OnInit } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private homeAwayService: HomeawayService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    //Query params-based search on page init
    this.activatedRoute.queryParams.subscribe(params => {
         console.log('params', params)
         this.homeAwayService.searchListings(params).subscribe((res) => {
             this.searchResults = res
             console.log("response in activatedRoute in results", this.searchResults)
         });
  })

}








}
