import { FichePage } from './../fiche/fiche';
import { TccDirectoryApiService } from '../../services/TccDirectoryApi.service';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TccDirectoryApiGlobal } from '../../models/tccdirectoryapi-global.model';
import { TccDirectoryApiGlobalList } from '../../models/tccdirectoryapi-globallist.model';
import { TccDirectoryApiBusiness } from '../../models/tccdirectoryapi-business.model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  params: Object;
  selected_skills: string;
  liste: TccDirectoryApiGlobal = new TccDirectoryApiGlobal();
  posts: any;

  skills: TccDirectoryApiGlobalList = new TccDirectoryApiGlobalList();
  news: TccDirectoryApiBusiness = new TccDirectoryApiBusiness();
  toppings: any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private tccDirApiService: TccDirectoryApiService
  ) {
    this.platform.ready()
    platform.ready()
      .then(() => {
        //recupere liste professionnels
        this.tccDirApiService.getBusiness()
          .then(newsFetched => {
            this.news = newsFetched;
            console.log(this.news);
          }).catch(err => console.log("erreur", err));


        //recupere liste skills
        this.tccDirApiService.getSkillsList()
          .then(newsFetched => {
            this.skills = newsFetched;
            console.log("getListeSkills : ", this.skills);
          }).catch(err => console.log("erreur", err));
      })
  }

  //Direction vers la page d'information après avoir cliqué sur un une liste
  launchPageList(id) {
    this.navCtrl.push(FichePage, { idBusiness: id });
  }

  //Filtre
  onChange($event) {

    this.selected_skills = $event;

    console.log("selected_skills", this.selected_skills);
    this.tccDirApiService.postSkillFilter(this.selected_skills)
      .subscribe(
        res => {
          console.log("home-postSkillFilter-then :", res);
          this.liste.data = res;
          console.log("getListeSkills : ", this.liste.data);
        },
        err => console.log("error", err)
      )

  }
}
