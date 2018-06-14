import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  goHome: string = "Start";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  go() {
    this.goHome;
    this.navCtrl.setRoot(HomePage);
    console.log('go to home GOOD');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }




}