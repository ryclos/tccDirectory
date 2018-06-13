import { FichePage } from './../fiche/fiche';
import { HomePage } from './../home/home';
import { ListPage } from './../list/list';
import { FavorisPage } from './../favoris/favoris';
import { Component } from '@angular/core';

//import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

 
  tab1Root = ListPage;
  tab2Root = FavorisPage;

  constructor() {

  }
}
