import { HomePage } from './../home/home';
import { FavorisPage } from './../favoris/favoris';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TccDirectoryApiGlobalList } from './../../models/tccdirectoryapi-globallist.model';
import { TccDirectoryApiBusiness } from './../../models/tccdirectoryapi-business.model';
import { TccDirectoryApiService } from './../../services/TccDirectoryApi.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { TccDirectoryApiGlobal } from '../../models/tccdirectoryapi-global.model';
declare var google;

const numTel = '87702840';
const messageSms = 'Hello Bitch';

@Component({
  selector: 'page-fiche',
  templateUrl: 'fiche.html',
})
export class FichePage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  results = [];
  value: string;
  idFromHome;

  news: TccDirectoryApiGlobalList = new TccDirectoryApiGlobalList();
  skills: TccDirectoryApiGlobal = new TccDirectoryApiGlobal();
  infos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geo: Geolocation,
    public http: Http,
    public menuCtrl: MenuController,
    public callPhone: CallNumber,
    public sms: SMS,
    private platform: Platform,
    private tccDirApiService: TccDirectoryApiService,
    private iab: InAppBrowser
  ) {



    this.platform.ready()
    platform.ready()
      .then(() => {
        this.loadMap();
        //recupere liste professionnels
        this.tccDirApiService.getBusinessById(this.navParams.get('idBusiness'))
          .then(newsFetched => {
            this.news = newsFetched
            console.log('NEWS : ', JSON.stringify(this.news));
          }).catch(err => console.log("erreur", JSON.stringify(err)));


        //recupere liste skills
        this.tccDirApiService.getSkillsList()
          .then(newsFetched => {
            this.skills = newsFetched;
            console.log("getListeSkills : ", JSON.stringify(this.skills));
          }).catch(err => console.log("erreur", err));
      })
  }

  //Charge la carte sur la liste information
  loadMap() {
    this.geo.getCurrentPosition()
      .then((position) => {
        /* let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ); */

        let latLng = new google.maps.LatLng(
          48.8583701, //Tour eiffel
          2.2922926
        );

        let mapOptions = {
          center: latLng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapRef.nativeElement,
          mapOptions
        );
        this.addMarker();
      },
        (err) => {
          console.log(err);
        });
  }

  //Place un marqueur
  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  }

  //Affichage après un click sur le marqueur
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }

  getSearchResults() {
    this.value = this.navParams.get('value');
    this.results = [];
    const url = `http://tccdirectory.1click.pf/api/search`;

    return this.http.post(url, { 'skills': this.value })
      .map(res => res.json())
      .subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          if (this.results.indexOf(data[i]) == -1) {
            this.results.push(data[i]);
          }
        }
        console.log('Développeur: ', this.results);
        console.log('Critères de recherche', this.value);
        return this.results;
      })
  }

  addResultsMarker() {
    let marker, i;
    console.log("Hello");
    for (i = 0; i < this.results.length; i++) {
      console.log("How are you?");
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.results[i].latitude, this.results[i].longitude),
        map: this.map
      });
      console.log("fine?");
      google.maps.event.addListener(marker, "click", () => {
        this.toggleMenu();
        console.log(JSON.stringify(this.results[i].latitude));
      });
    }
  }

  toggleMenu() {
    //this.menuId = x;
    this.menuCtrl.toggle();
  }

  call() {
    this.callPhone.callNumber(`${numTel}`, true)
      .then(() => {
        console.log('Ca fonctionne!')
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      });
  }

  sendSms() {
    this.sms.send(`${numTel}`, `${messageSms}`)
      .then(() => {
        console.log('Ca fonctionne!')
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      });
  }

  openFB(facebook_url) {
    this.iab.create(facebook_url, '_blank');
  }

  openEmail(email) {
    this.iab.create(email, '_blank');
  }

  openLinkedin(linkedin_url) {
    this.iab.create(linkedin_url, '_blank');
  }

  goToFavoris() {
    this.navCtrl.push(FavorisPage);
  }

  goToList() {
    this.navCtrl.push(HomePage);
  }
}
