// import { FichePage } from './../fiche/fiche';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  launchFiche() {
    this.navCtrl.push(TabsPage);
  }
}

