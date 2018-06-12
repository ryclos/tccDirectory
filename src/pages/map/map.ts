import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

/**
 * Projet à faire si projet initial terminé.
 *
 * Tinirau, Poe et Hiomai
 */

Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private geo: Geolocation) {}

  ionViewDidLoad() {
   this.loadMap();
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
