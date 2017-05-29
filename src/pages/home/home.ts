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
  users: FirebaseListObservable<any[]>;

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
    this.users = this._db.list('/users');
  }

}
