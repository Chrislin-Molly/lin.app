import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private route:ActivatedRoute, private afAuth: AngularFireAuth) { }
  
  public login(): void{
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')|| '/'
    localStorage.setItem('returnUrl',returnUrl)
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  public logout(): void{
    this.afAuth.signOut();
  }

  public getAuthState(): Observable<firebase.User | null>{
    return this.afAuth.authState
  }
}
