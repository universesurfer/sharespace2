import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeawayService } from '../homeaway.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  detailParams: any;
  listingDetails: any;

  constructor(
    private http: HttpClient,
    private homeAwayService: HomeawayService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {

    //Query params-based search on page init
    this.activatedRoute.queryParams.subscribe(params => {
         console.log('rental detail params', params)
         // this.detailParams = params
         this.homeAwayService.getListingDetails(params).subscribe(res => {
             // this.listingDetails = res
             console.log("response in activatedRoute in rental details", res)
         });
    })

  }



}
