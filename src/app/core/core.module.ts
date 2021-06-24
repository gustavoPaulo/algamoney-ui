import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado/acesso-negado.component';
import { AuthService } from './../seguranca/auth.service';
import { UsuarioService } from '../configuracao/usuarios/usuario.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { RelatoriosService } from './../relatorios/relatorios.service';
import { AlterarSenhaService } from './../configuracao/alterar-senha/alterar-senha.service';

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule
  ],
  imports: [
    CommonModule,

    ToastModule,
    ConfirmDialogModule,

    RouterModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    CategoriaService,
    Title,
    AuthService,
    UsuarioService,
    DashboardService,
    AlterarSenhaService,
    RelatoriosService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
