import { Component } from '@angular/core';
import { Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AuthService } from "../providers/auth.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { MenuPopoverPage } from "../pages/menu-popover/menu.popover.component";

@Component({
  templateUrl: 'app.html'
})
export class ScoreBoardApp {
  rootPage:any = HomePage;
  user: BehaviorSubject<firebase.User> = new BehaviorSubject(null);

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    private _authService: AuthService, 
    private _popoverCtrl:PopoverController) {

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        this._authService.getUser().subscribe((user)=> {
          if(user && user !== null) {
            this.user.next(user);
          }
          this.rootPage = HomePage;
        })
      });
  };

  logout() {
    this._authService.logout();
  }

   presentPopover(myEvent) {
    let popover = this._popoverCtrl.create(MenuPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

