import { Component, Input, ViewChild } from '@angular/core';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { CategoriaService, CategoriaFiltro } from './../categoria.service';
import { CategoriaPesquisaComponent } from './../categoria-pesquisa/categoria-pesquisa.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-categoria-grid',
  templateUrl: './categoria-grid.component.html',
  styleUrls: ['./categoria-grid.component.css']
})
export class CategoriaGridComponent{

  @Input() categorias = [];
  @Input() totalRegistros: number;
  filtro = new CategoriaFiltro();
  @ViewChild('tabela') grid;
  authCategoria = this.auth;


  constructor(
    private categoriaPesquisa: CategoriaPesquisaComponent,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
    ) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.categoriaPesquisa.pesquisar(pagina);
  }

  confirmarExclusao(categoria: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(categoria);
      }
    });
  }

  excluir(categoria: any) {
    this.categoriaService.excluir(categoria.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.categoriaPesquisa.pesquisar();
      } else {
        this.grid.reset();
      }

      this.messageService.add({ severity: 'success', detail: 'Categoria excluída com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
