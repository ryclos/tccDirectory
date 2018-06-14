import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from './../tabs/tabs';
import { HttpModule, Http } from '@angular/http';
declare var google;

@Component({
  selector: 'page-fiche',
  templateUrl: 'fiche.html',
})
export class FichePage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  results = [];
  value: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geo: Geolocation,
    public http: Http,
    private platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    this.geo.getCurrentPosition()
      .then((position) => {
        /* let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ); */

        let latLng = new google.maps.LatLng(
          48.8583701,
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

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  }

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

    for (i = 0; i < this.results.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.results[i].latitude, this.results[i].longitude),
        map: this.map
      });

    }

  }
}
