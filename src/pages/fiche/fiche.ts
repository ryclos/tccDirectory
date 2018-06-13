import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from './../tabs/tabs';
declare var google;

@Component({
  selector: 'page-fiche',
  templateUrl: 'fiche.html',
})
export class FichePage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
      
    });
  }

  loadMap() {
    let latLng = new google.maps.LatLng(-17.546039, -149.570258);
    let mapOptions = {
      center: latLng,
      zoom: 15,
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
  }
  
}


