import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import  MyApp  from './app.component';
import { HomePage } from '../pages/home/home';



import { CanvasDraw } from '../components/canvas-draw/canvas-draw';
import { Mainline } from '../components/main-line/main-line';
import { LeftPoint } from '../components/left-point/left-point';
import { RigthPoint } from '../components/rigth-point/rigth-point';
import { Item } from '../components/item/item';
import { SideLine } from '../components/side-line/side-line';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Item,
    CanvasDraw,
    Mainline,
    LeftPoint,
    RigthPoint,
    SideLine
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    Item,
    Mainline,
    LeftPoint,
    RigthPoint
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
