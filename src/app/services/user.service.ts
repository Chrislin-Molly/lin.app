import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app'
import { AppUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public rootNode: string = '/user'
  constructor( private db: AngularFireDatabase ) { }

  public saveUser(user :firebase.User):void {
    this.db.object(`${this.rootNode}/ ${user.uid}`).update({
      name:user.displayName,
      email:user.email
    })
  }

  public getUser (uid: string): AngularFireObject<AppUser>{
    return this.db.object(`${this.rootNode}/${uid}`)
  }
}
