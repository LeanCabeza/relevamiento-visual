import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasLindasPageRoutingModule } from './cosas-lindas-routing.module';

import { CosasLindasPage } from './cosas-lindas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasLindasPageRoutingModule
  ],
  declarations: [CosasLindasPage]
})
export class CosasLindasPageModule {}
