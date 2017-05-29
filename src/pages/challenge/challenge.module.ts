import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Challenge } from './challenge';

@NgModule({
  declarations: [
    Challenge,
  ],
  imports: [
    IonicPageModule.forChild(Challenge),
  ],
  exports: [
    Challenge
  ]
})
export class ChallengeModule {}
