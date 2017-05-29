import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
    IonicStorageModule
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
