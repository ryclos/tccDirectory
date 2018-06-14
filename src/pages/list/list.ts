
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TccDirectoryApiBusiness } from '../../models/tccdirectoryapi-business.model';
import { TccDirectoryApiService } from '../../services/TccDirectoryApi.service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  id: number;
  news: TccDirectoryApiBusiness = new TccDirectoryApiBusiness();
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public tccDirApiService: TccDirectoryApiService
  ) {
    platform.ready().then(() => {
      this.id = navParams.get('data'); //récupère la donnée "data" envoyée de la page Home
      this.tccDirApiService.getSkills(this.id)
        // this.infosProApiService.postSkillFilter()
        .then(newsFetched => {
          this.news = newsFetched;
          console.log(this.news);
        }).catch(err => console.log("erreur constructor home ", err));
    });
  }


  //Mmmm




}
