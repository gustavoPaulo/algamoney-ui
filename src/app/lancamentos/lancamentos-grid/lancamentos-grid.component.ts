import { Component, Input, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent{

  @Input() lancamentos = [];
  @Input() totalRegistros: number;
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') grid;
  authLancamento = this.auth;


  constructor(
    private lancamentosPesquisa: LancamentosPesquisaComponent,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
    ) { }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.lancamentosPesquisa.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.lancamentosPesquisa.pesquisar();
      } else {
        this.grid.reset();
      }

      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
