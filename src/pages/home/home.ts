import { WelcomePage } from './../welcome/welcome';
import { TccDirectoryApiService } from '../../services/TccDirectoryApi.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TccDirectoryApiGlobal } from '../../models/tccdirectoryapi-global.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: TccDirectoryApiGlobal = new TccDirectoryApiGlobal();
  toppings: any;

  constructor(public navCtrl: NavController, private tccdirectoryapiService: TccDirectoryApiService,) {

    this.tccdirectoryapiService.getSkills()
    .then(newsFetched => { 
      this.news = newsFetched
      console.log(this.news);
    });
  }

  launchFiche() {
    this.navCtrl.push(WelcomePage);
  }
}

