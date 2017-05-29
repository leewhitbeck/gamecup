import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import { User } from "../models/user";

@Injectable()
export class AuthService {

  constructor(
    private _afAuth: AngularFireAuth, 
    private _platform: Platform, 
    private _db: AngularFireDatabase) 
    {}

  getUser(): Observable<firebase.User> {
    return this._afAuth.authState;
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  loginEmail(creds: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
        .then((user) => {
          this._updateUser(user, creds, (data) => {
            resolve(data);
          });
        }, (err) => {
          reject(err);
        })
    });
  }

  signupEmail(creds: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(creds.email, creds.password)
        .then((res) => {
          this._afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
            .then((user) => {
              this._updateUser(user, creds, (data) => {
                resolve(data);
              });
            });
        },(err)=> {
          reject(err);
        });
    });
  };

  private _updateUser(user: any, creds: any, firebaseCallback: (data: any) => void) {
    let userRef = firebase.database().ref('users/' + user.uid);
    userRef.once('value', (data: any) => {
      if (!data.val()) {
        let newUser: User = new User({
          name: creds.name,
          emailVerified: false,
          photoURL: (user.photoURL) ? user.photoURL : null,
          lat: null,
          providerId: (user.provider) ? user.provider : 'email',
          uid: user.uid,
          matches: null,
          teams: null,
          email: user.email,
          joined: Date.now(),
          recentActivity: Date.now(),
          online: true
        });

        userRef.update(newUser , (resp) => {
          firebaseCallback(resp);
        });
      }
      //user already exists, just update a few properties
      else {
        userRef.update({
          online: true,
          recentActivity: Date.now()
        }, (resp) => {
          firebaseCallback(resp);
        });
      }
    });
  }
}
