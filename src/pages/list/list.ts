import { FichePage } from './../fiche/fiche';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  launchFiche(){
    this.navCtrl.push(FichePage);
  }

}
