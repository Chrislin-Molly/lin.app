import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements CanActivate {

  constructor(private authService: AuthenticationService, private router:Router) { }

  //authguards
  //return observable of a boolean...need to transform subscription to that
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
    // this.authService.getAuthState().subscribe(
    //   user =>{
    //     if(user){return user}
    //     return false
    //   }
    // )
    return this.authService.getAuthState().pipe(
      map(user => {
        if(user){return true;}
        this.router.navigate(['/login'])
        return false;
      })
    )
  }
}
