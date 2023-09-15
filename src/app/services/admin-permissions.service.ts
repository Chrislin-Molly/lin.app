import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionsService implements CanActivate{

  constructor(private userService: UserService ,private authService: AuthenticationService) { }
  public canActivate(): Observable<boolean>{
    return this.authService.getAuthState().pipe(
      //of...observable of
      switchMap( user => user? this.userService.getUser(user.uid).valueChanges(): of(null)),
      map( appUser => appUser?.isAdmin ? appUser.isAdmin  : false )
    )
  }
}


