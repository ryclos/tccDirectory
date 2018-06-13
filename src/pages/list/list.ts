import { FichePage } from './../fiche/fiche';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TccDirectoryApiService } from '../../services/TccDirectoryApi.service';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  news: TccDirectoryApiList = new TccDirectoryApiList();

  constructor(public navCtrl: NavController, public navParams: NavParams, private tccdirectoryapiService: TccDirectoryApiService,) {
    this.tccdirectoryapiService.getList()
    .then(newsFetched => { 
      this.news = newsFetched
      console.log(this.news);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  launchFiche(){
    this.navCtrl.push(FichePage);
  }

}
