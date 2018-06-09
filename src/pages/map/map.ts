import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Projet à faire si projet initial terminé.
 *
 * Tinirau, Poe et Hiomai
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
