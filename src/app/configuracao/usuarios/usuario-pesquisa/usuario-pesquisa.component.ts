import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UsuarioFiltro, UsuarioService } from './../usuario.service';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  usuarios = [];
  filtro = new UsuarioFiltro();
  totalRegistros = 0;


  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }


  ngOnInit() {
    this.title.setTitle('Pesquisa de usuários');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.usuarios = resultado.usuarios;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
