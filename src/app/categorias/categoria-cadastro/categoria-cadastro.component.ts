import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CategoriaService } from './../categoria.service';
import { Categoria } from 'src/app/core/model/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  categoria = new Categoria();


  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }


  ngOnInit() {
    const codigoCategoria = this.route.snapshot.params[`codigo`];

    if (codigoCategoria) {
      this.carregarCategoria(codigoCategoria);
    }

    this.title.setTitle('Cadastro de categoria');
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCategoria(form);
    }else {
      this.adicionarCategoria(form);
    }
  }

  carregarCategoria(codigo: number) {
    this.categoriaService.buscarPorCodigo(codigo)
      .then(categoria => {
        this.categoria = categoria;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarCategoria(form: FormControl) {
    this.categoriaService.salvar(this.categoria)
    .then(() => {
      this.novo(form);
      this.messageService.add({ severity: 'success', detail: 'Categoria adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCategoria(form: FormControl) {
    this.categoriaService.atualizar(this.categoria)
    .then(categoria => {
      this.categoria = categoria;
      this.messageService.add({ severity: 'success', detail: 'Categoria alterada com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.categoria.codigo);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.categoria = new Categoria();
    }.bind(this), 1);

    this.router.navigate(['/categorias/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de categoria: ${this.categoria.nome}`);
  }

}
