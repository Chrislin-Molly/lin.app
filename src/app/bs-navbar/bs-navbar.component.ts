import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import firebase from 'firebase/compat/app';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy{
  
  public user!:firebase.User | null; //weird import
  public subscriptions: Array<Subscription>=[];
  constructor(private authService: AuthenticationService){}
  ngOnInit(): void{
    this.subscriptions.push(
      this.authService.getAuthState().subscribe(user => this.user=user)
    )
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }

  logout(){
    this.authService.logout();
  }
}
