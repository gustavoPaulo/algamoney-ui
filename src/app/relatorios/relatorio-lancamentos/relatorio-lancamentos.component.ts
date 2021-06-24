import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RelatoriosService } from './../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  br: any;
  periodoInicio: Date;
  periodoFim: Date;
  uploadEmAndamento = false;


  constructor(
    private relatoriosService: RelatoriosService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title
  ) { }


  ngOnInit(){
    this.calendario();
    this.title.setTitle('Relatório de lançamentos');
  }

  gerar() {
    this.uploadEmAndamento = true;

    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);

        this.messageService.add({ severity: 'success', detail: 'Relatório gerado com sucesso!' });
        this.uploadEmAndamento = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  @Input()
  calendario(){
    this.br =
      this.relatoriosService.calendarioEmPortugues();
  }

}
