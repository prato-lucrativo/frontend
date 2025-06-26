import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroPratoPage } from './cadastro-prato.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPratoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroPratoPageRoutingModule {}
