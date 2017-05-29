import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScoreBoardApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from "../config/firebase";
import { AuthService } from "../providers/auth.service";
import { Login } from "../pages/login/login";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RegisterModule } from "../pages/register/register.module";
import { MenuPopoverPage } from "../pages/menu-popover/menu.popover.component";

@NgModule({
  declarations: [
    ScoreBoardApp,
    HomePage,
    Login,
    MenuPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ScoreBoardApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ScoreBoardApp,
    HomePage,
    Login,
    MenuPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
