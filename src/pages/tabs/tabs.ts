import { MapPage } from './../map/map';
import { FavorisPage } from './../favoris/favoris';
import { Component } from '@angular/core';


import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = FavorisPage;

  constructor() {

  }
}
