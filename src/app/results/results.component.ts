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

  constructor(
    private http: HttpClient,
    private homeAwayService: HomeawayService,
    // private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
         console.log('params', params)
         this.homeAwayService.searchListings(params)
           .subscribe((res) => {
             console.log(res)
             console.log(params.trip)
         });
  })
}


}
