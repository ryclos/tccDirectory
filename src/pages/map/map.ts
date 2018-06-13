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
  
  addResultsMarker() {
    let marker, i;

    for (i = 0; i < this.results.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.results[i].latitude, this.results[i].longitude),
            map: this.map
        });

        let contentString = "<div>" + "<img src='" + 
            this.results[i].logo + "'  style = 'display: block; margin-left: auto; margin-right: auto; width: 50%; height: 50%'/>" + '</div>' +
            "<hr/><div style = 'text-align: center'><h2>" + this.results[i].name + '</h2></div>';
        let infoWindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 256
        });

        google.maps.event.addListener(marker, "click", () => {
            infoWindow.open(this.map, marker);
        });
    }
}

  /* getSearchResults() {
    this.value = this.navParams.get('value');
    this.results = [];
    const url = 'http://tccdirectory.1click.pf/api/search';

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
  } */
}
