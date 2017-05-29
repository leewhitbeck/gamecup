import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../providers/auth.service";
import { HomePage } from "../home/home";
import { VALIDATION_MESSAGES, LOGIN_FORM_ERRORS } from "../../utils/form-validators";
import { Login } from "../login/login";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  signupForm: FormGroup;
  submitted: boolean;
  formErrors = LOGIN_FORM_ERRORS;

  constructor(
    private navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _toastCtrl: ToastController) {

    this.signupForm = _formBuilder.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)
      ]
      ],
      'email': ['',
        Validators.compose([
          Validators.required,
          Validators.email])],
      'password': ['',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(24),
          Validators.required])]
    });

    //listen for form changes using reactive forms validations
    this.signupForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(data => this._onFormnValueChanged(data));
  }

  private _onFormnValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = VALIDATION_MESSAGES[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  signupUser() {

    if (this.signupForm.valid) {
      this._auth.signupEmail(this.signupForm.value)
        .then((resp) => {
          this.navCtrl.setRoot(HomePage);
        }, (error) => {
          this._markFormDirty(error.message);
          this._notify(error.message);
        });
    }
    else {
      this._notify('please ensure all form items are filled or contact our admin');
    }

  }

  login() {
    this.navCtrl.setRoot(Login);
  }

  private _notify(msg: string) {
    let toast = this._toastCtrl.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom'
    });
    toast.present();
  }

  private _markFormDirty(errorMsg: any) {

    if (errorMsg.indexOf('email') !== -1) {
      let emailCtrl = this.signupForm.get('email');
      emailCtrl.markAsDirty();
      emailCtrl.setErrors({ "email": false })
    }

    if (errorMsg.indexOf('password') !== -1) {
      let passwordCtrl = this.signupForm.get('password');
      passwordCtrl.markAsDirty();
      passwordCtrl.setErrors({ "password": false })
    }

  }
}
