import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private route:ActivatedRoute, private afAuth: AngularFireAuth) { }
  
  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')|| '/'
    localStorage.setItem('returnUrl',returnUrl)
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  logout(){
    this.afAuth.signOut();
  }

  getAuthState(){
    return this.afAuth.authState
  }
}
