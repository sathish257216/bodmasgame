import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { BodmasComponent } from '../pages/bodmas/bodmas.component';
import { BodmasService } from '../pages/bodmas/bodmas.service';
import { SucessComponent } from '../pages/bodmas/success/sucess.component';

@NgModule({
  declarations: [
    MyApp,
    BodmasComponent,
    SucessComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BodmasComponent,
    SucessComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BodmasService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
