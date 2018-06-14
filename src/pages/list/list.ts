import { FichePage } from './../fiche/fiche';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TccDirectoryApiGlobalList } from '../../models/tccdirectoryapi-globallist.model';
import { TccDirectoryApiService } from '../../services/TccDirectoryApi.service';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  selected_skills: string;
  liste: TccDirectoryApiGlobalList = new TccDirectoryApiGlobalList();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private tccDirApiService: TccDirectoryApiService
    ) {
  }

  launchPageList(id) {
    this.navCtrl.push(FichePage, { data: id });
  }

  //Mmmm
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
      err => console.log("error",err)
    )

  }



}
