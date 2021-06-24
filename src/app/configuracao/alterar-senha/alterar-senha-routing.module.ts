import { AlterarSenhaComponent } from './alterar-senha.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'senha',
    component: AlterarSenhaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_SENHA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AlterarSenhaRoutingModule {}
