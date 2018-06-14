import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
declare var google;

/**
 * Projet à faire si projet initial terminé.
 *
 * Tinirau, Poe et Hiomai
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map')
  mapRef: ElementRef;
  map: any;
  results = [];
  value: string;
  constructor(public navCtrl: NavController, private geo: Geolocation, private platform: Platform, private navParams: NavParams, private http: Http) {
    platform.ready()
      .then(() => {
        this.loadMap();
      });
  }



  loadMap() {
    this.geo.getCurrentPosition()
      .then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 17,
        }
        this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
      }, (err) => {
        console.log(err);
      });
  }
}
