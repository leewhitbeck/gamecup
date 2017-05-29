import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from "../../providers/auth.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authUser: firebase.User;
  teams: FirebaseListObservable<any[]>;
  // users: FirebaseListObservable<any[]>;
  users: any[] = [];

  constructor(
    public navCtrl: NavController, 
    private _authService: AuthService, 
    private _db: AngularFireDatabase) {}

  ionViewCanEnter() {
    this._authService.getUser().subscribe((user) => {
     return user !== null;
    });
  }

  ionViewDidLoad() {
   let count = 1;

   for(let i = 0; i< 21; i++) {
     this.users.push({
       uid: count,
       name: 'player' + count,
       email: 'test@test.com',
       joined: Date.now(),
       recentActivity: Date.now(),
       photoURL: '',
       providerId: 'email',
       online: true,
       wins: Math.floor(Math.random() * 100),
       losses: Math.floor(Math.random() * 100),
       score: Math.floor(Math.random() * 1000)
     })
     count++;
   }
  }
}
