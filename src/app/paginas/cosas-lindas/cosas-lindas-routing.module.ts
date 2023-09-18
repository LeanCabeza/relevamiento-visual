import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasLindasPage } from './cosas-lindas.page';

const routes: Routes = [
  {
    path: '',
    component: CosasLindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasLindasPageRoutingModule {}
