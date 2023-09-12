import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lin.app';
  constructor(private router:Router, private authService: AuthenticationService){
    authService.getAuthState().subscribe(user =>{
      if(user){
        let returnUrl=localStorage.getItem('returnUrl');
        if(returnUrl){
          router.navigateByUrl(returnUrl);
        }
        else{
          router.navigate(['/']);
        }
      }
    })
  }
}
