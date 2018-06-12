import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite,SQLiteObject } from "@ionic-native/sqlite";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',

})
export class WelcomePage {

  database: SQLiteObject;
  progress: any;
  
  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.redirectToTabs();
    })
  }
  initDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.createFavorisTable();
      })
      .catch(e => console.log(e));
  }

  createFavorisTable() {
    this.database.executeSql('CREATE TABLE IF NOT EXISTS Favoris (id INTEGER PRIMARY KEY, name TEXT,  logo TEXT)', {})
      .then(() => {
        this.checkFavorisExist().then((data) => {
          let totalFavoris = data;
          console.log('totalFavoris', data);
          if (totalFavoris = 21) this.redirectToTabs();
          else this.insertFavorisDatas();
        });
      })
      .catch(e => console.log(e));
  }

  dropFavorisTable(): any {
    this.database.executeSql('DROP TABLE favoris', {})
      .then(() => {
        console.log('table favoris dropped');
      })
      .catch(e => console.log(e));
  }

  checkFavorisExist(): any {
    return this.database.executeSql('SELECT * FROM favoris', {})
      .then((data) => {
        return data.rows.length;
      })
      .catch(e => console.log(e));
  }

  insertFavorisDatas() {

    let inserts =
    "INSERT INTO `favoris` VALUES ();";
  ;
    this.database.executeSql(inserts, {})
      .then(() => {
       this.redirectToTabs()
      })
      .catch(e => console.log('error',e));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  redirectToTabs() {
    let limit = 4;
    let counter = 0;
    let myInterval = setInterval(() => {
      counter++;
      console.log('counter', counter);
      this.progress = counter * 100 / limit;
      console.log('progress', this.progress);
      if (counter == limit) {
        clearInterval(myInterval);
        this.navCtrl.push(HomePage);
      }
    }, 1000);
  }

}
