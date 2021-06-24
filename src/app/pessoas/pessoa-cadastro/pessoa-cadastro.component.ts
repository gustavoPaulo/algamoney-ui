import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model/model';
import { PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit{

  status = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];
  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;


  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }


  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params[`codigo`];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }

    this.title.setTitle('Cadastro de pessoa');
    this.carregarEstados();
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    }else {
      this.adicionarPessoa(form);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.codigo : null;

          if (this.estadoSelecionado) {
            this.carregarCidades();
          }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.novo(form);
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
