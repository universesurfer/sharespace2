import { Component, OnInit} from '@angular/core';
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
export class RentalComponent implements OnInit {

  listingDetails: any;
  photos: array<object>;

  activeSlideIndex = 0; //Start slideshow at first photo
  myInterval = 0; //Turns off auto scrolling

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
             this.listingDetails = res
             console.log("response in activatedRoute in rental details", res)
         });
    })

  }



}
