import { Component, OnInit, Input} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaFiltro, CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipoLancamento = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  br: any;
  filtroCategoria = new CategoriaFiltro();
  uploadEmAndamento = false;


  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService
    ) { }


  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params[`codigo`];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.calendario();
    this.carregarCategorias();
    this.carregarPessoas();
    this.title.setTitle('Cadastro de lançamento');
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c =>
        ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p =>
        ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    }else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
    .then(() => {
      this.novo(form);
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamentoAlterado => {
      this.lancamento = lancamentoAlterado;
      this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  @Input()
  calendario(){
    this.br =
      this.lancamentoService.calendarioEmPortugues();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

  get urlUploadAnexo() {
    const url = this.lancamentoService.urlUploadAnexo();

    return url;
  }

  antesUploadAnexo(event) {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = event.originalEvent.body;

    this.lancamento.anexo = anexo.nome;
    this.lancamento.urlAnexo = anexo.url;

    this.uploadEmAndamento = false;
  }

  get nomeAnexo() {
    const nome = this.lancamento.anexo;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo!' });
    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.lancamento.anexo = null;
        this.lancamento.urlAnexo = null;
        this.messageService.add({ severity: 'info', detail: 'Anexo removido.' });
      }
    });
  }

}
