import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionsService implements CanActivate{

  constructor(private userService: UserService ,private authService: AuthenticationService, private router:Router) { }
  public canActivate(){
    return this.authService.getAuthState().pipe(
      //of...observable of
      switchMap( user => user? this.userService.getUser(user.uid).valueChanges(): of(null)),
      map( appUser => appUser?.isAdmin ? appUser.isAdmin  : false )
    )
  }
}


