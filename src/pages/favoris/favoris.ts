import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  goToSkill() {
    this.navCtrl.push(HomePage);
  }
  

}
