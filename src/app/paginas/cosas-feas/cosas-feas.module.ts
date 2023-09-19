import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CosasFeasPageRoutingModule } from './cosas-feas-routing.module';

import { CosasFeasPage } from './cosas-feas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasFeasPageRoutingModule
  ],
  declarations: [CosasFeasPage]
})
export class CosasFeasPageModule {}
