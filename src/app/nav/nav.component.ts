import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }


//LOGIN Modal

  // openModalWithComponent() {
  //   const initialState = {
  //     list: [
  //       'Open a modal with component',
  //       'Pass your data',
  //       'Do something else',
  //       '...'
  //     ],
  //     title: 'Modal with component'
  //   };
  //   this.bsModalRef = this.modalService.show(LoginComponent, {initialState});
  //   this.bsModalRef.content.closeBtnName = 'Close';
  // }


}
