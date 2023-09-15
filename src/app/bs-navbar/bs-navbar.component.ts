import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import firebase from 'firebase/compat/app';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AppUser } from '../models/interfaces';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy{
  
  public user!:firebase.User | null; //weird import
  public appUser!: AppUser | null;
  public subscriptions: Array<Subscription>=[];
  constructor(private authService: AuthenticationService, private userService: UserService){}
  public ngOnInit(): void{
    this.subscriptions.push(
      this.authService.getAuthState().subscribe(user => {
        this.user=user;
        if(this.user){
          this.userService.saveUser(this.user);
          this.getAppUser();
        }
      })
    )
  }
  public ngOnDestroy():void{
    this.subscriptions.forEach(subscriptions => subscriptions.unsubscribe());
  }

  public logout(): void {
    this.authService.logout();
  }
  public getAppUser(){
    this.subscriptions.push(
      this.userService.getUser(this.user!.uid).valueChanges().subscribe(appUser => {
        this.appUser = appUser;
      })
    )
  }
  
}
