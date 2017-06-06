import { Component } from '@angular/core';
import { MenuPopoverPage } from "../../pages/menu-popover/menu.popover.component";
import { PopoverController } from "ionic-angular";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class Header {

  text: string;

  constructor(private _popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this._popoverCtrl.create(MenuPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
