import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../providers/auth.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class Login {

  isAuthenticated: boolean = false;
  myForm: FormGroup;
  user: firebase.User;
  error: boolean = false;

  constructor(private navCtrl: NavController, private _formBuilder: FormBuilder, private _auth: AuthService) {
    this.myForm = _formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
    this._listenToUserAuthChanges();
  }

  onSubmit(form) {

    this._auth.loginEmail(form.value)
      .then((resp) => {
        this.isAuthenticated = true;
        this.navCtrl.push(HomePage);
      }, (err) => {
        this.error = true;
      })
  }

  private _listenToUserAuthChanges() {
    this._auth.getUser().subscribe((resp) => {
      if (resp) {
        this.user = resp;
        this.isAuthenticated = true;
      }
    });
  }


}