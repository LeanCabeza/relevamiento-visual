import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasFeasPage } from './cosas-feas.page';

const routes: Routes = [
  {
    path: '',
    component: CosasFeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasFeasPageRoutingModule {}
