import { Component, Input, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { UsuarioService } from './../usuario.service';
import { UsuarioPesquisaComponent } from './../usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioFiltro } from '../usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-usuario-grid',
  templateUrl: './usuario-grid.component.html',
  styleUrls: ['./usuario-grid.component.css']
})
export class UsuarioGridComponent{

  @Input() usuarios = [];
  @Input() totalRegistros: number;
  filtro = new UsuarioFiltro();
  @ViewChild('tabela') grid;
  authUsuario = this.auth;


  constructor(
    private usuariosPesquisa: UsuarioPesquisaComponent,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
  ) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.usuariosPesquisa.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.usuariosPesquisa.pesquisar();
      } else {
        this.grid.reset();
      }

      this.messageService.add({ severity: 'success', detail: 'Usuário excluído com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  naoExcluirUsuarioLogado(usuario: any) {
    if (this.auth.jwtPayload.nome != usuario.nome) {
      return false;
    } else {
      return true;
    }
  }

}
