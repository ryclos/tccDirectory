//Fonctionalités
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TccDirectoryApiService } from '../services/TccDirectoryApi.service';

//Pages
import { HomePage } from '../pages/home/home';
import { FavorisPage } from './../pages/favoris/favoris';
import { FichePage } from './../pages/fiche/fiche';
import { WelcomePage } from './../pages/welcome/welcome';
import { OnboardingPage } from './../pages/onboarding/onboarding';

// Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from "@ionic-native/call-number";
import { Geolocation } from "@ionic-native/geolocation";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SMS } from "@ionic-native/sms";
import { SQLite } from "@ionic-native/sqlite";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OnboardingPage,
    WelcomePage,
    FavorisPage,
    FichePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    OnboardingPage,
    FavorisPage,
    FichePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Geolocation,
    InAppBrowser,
    SMS,
    SQLite,
    TccDirectoryApiService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {

}
