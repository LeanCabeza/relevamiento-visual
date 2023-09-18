import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing-module';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [CommonModule,
            FormsModule,
            IonicModule,
            HomePageRoutingModule],
  declarations: [HomeComponent]
})

export class HomeModule { }
