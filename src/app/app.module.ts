import { TccDirectoryApiService } from '../services/TccDirectoryApi.service';
import { MapPage } from './../pages/map/map'; // projet si projet initial fini :)
import { ListPage } from './../pages/list/list';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import { HomePage } from '../pages/home/home';
import { FavorisPage } from './../pages/favoris/favoris';
import { FichePage } from './../pages/fiche/fiche';
import { WelcomePage } from './../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';

// Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from "@ionic-native/call-number";
import { Geolocation } from "@ionic-native/geolocation";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SMS } from "@ionic-native/sms";
import { SQLite } from "@ionic-native/sqlite";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    WelcomePage,
    MapPage,
    ListPage,
    FavorisPage,
    FichePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    WelcomePage,
    MapPage,
    ListPage,
    FavorisPage,
    FichePage
  ],
  providers: [
    TccDirectoryApiService,
    StatusBar,
    SplashScreen,
    HttpModule,
    CallNumber,
    Geolocation,
    InAppBrowser,
    SMS,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {

}
