import { ViewController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from "../../providers/auth.service";
import { Profile } from "../profile/profile";
import { Register } from "../register/register";
import { Login } from "../login/login";

@Component({
  template: `
    <ion-list>
      <ion-list-header *ngIf="!loggedIn" >Sign or register</ion-list-header>
      <ion-list-header *ngIf="loggedIn" >Hello, world </ion-list-header>
      <button ion-item *ngIf="!loggedIn" (click)="onLoginClick()">Logout</button>
      <button ion-item *ngIf="loggedIn" (click)="onLogoutClick()">Logout</button>
      <button ion-item (click)="onMyProfileClick()"> My Profile </button>
      <button ion-item (click) ="onRegisterClick()"> Register </button>
      <button ion-item> Contact US</button>
       <button ion-item > Admin</button>
    </ion-list>
  `
})
export class MenuPopoverPage {

  loggedIn: boolean = false;

  constructor(
    public viewCtrl: ViewController, 
    private  _navCtrl: NavController, 
    private _authService: AuthService) {
      this._authService.getUser().subscribe((user)=> {
          this.loggedIn = (user && user !== null) ? true : false;
      });
    }

  close() {
    this.viewCtrl.dismiss();
  }

  onLoginClick() {
    this._navCtrl.push(Login);
  }

  onLogoutClick() {
    this._authService.logout();
  }

  onRegisterClick() {
    this._navCtrl.push(Register);
  }

  onMyProfileClick() {
     this._navCtrl.push(Profile);
  }


}