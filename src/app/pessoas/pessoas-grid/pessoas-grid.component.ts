import { Component, Input, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { PessoasPesquisaComponent } from './../pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent{

  @Input() pessoas = [];
  @Input() totalRegistros: number;
  filtro = new PessoaFiltro();
  @ViewChild('tabela') grid;
  authPessoa = this.auth;


  constructor(
    private pessoasPesquisa: PessoasPesquisaComponent,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
    ) { }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pessoasPesquisa.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pessoasPesquisa.pesquisar();
      } else {
        this.grid.reset();
      }

      this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      pessoa.ativo = novoStatus;
      this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
