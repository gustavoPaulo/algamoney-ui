import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  pessoas = [];
  filtro = new PessoaFiltro();
  totalRegistros = 0;


  constructor(
    private pessoasService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }


  ngOnInit() {
   this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
