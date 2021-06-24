import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  br: any;
  lancamentos = [];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;


  constructor(
      private lancamentoService: LancamentoService,
      private errorHandler: ErrorHandlerService,
      private title: Title
    ) { }


  ngOnInit() {
    this.calendario();
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  @Input()
  calendario() {
    this.br =
      this.lancamentoService.calendarioEmPortugues();
  }

}
