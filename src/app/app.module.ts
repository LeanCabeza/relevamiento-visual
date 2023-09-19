import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrts9hTdo-aQEfbKdvqme_fhjM4PfhKFU",
  authDomain: "pps-2023-3661d.firebaseapp.com",
  projectId: "pps-2023-3661d",
  storageBucket: "pps-2023-3661d.appspot.com",
  messagingSenderId: "759605409724",
  appId: "1:759605409724:web:ad60abe94eff4a26585db9"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
    ],
  providers: [
     {provide: FIREBASE_OPTIONS, useClass: IonicRouteStrategy, useValue: firebaseConfig } ],

  bootstrap: [AppComponent],
})
export class AppModule {}