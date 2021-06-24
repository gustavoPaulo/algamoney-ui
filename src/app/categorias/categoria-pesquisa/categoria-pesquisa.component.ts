import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CategoriaFiltro, CategoriaService } from './../categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit{

  categorias = [];
  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  authCategoria = this.auth;


  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private auth: AuthService
  ) { }


  ngOnInit() {
    this.title.setTitle('Pesquisa de categorias');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.categoriaService.pesquisar(this.filtro)
      .then(resultado => {
        this.categorias = resultado.categorias;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
