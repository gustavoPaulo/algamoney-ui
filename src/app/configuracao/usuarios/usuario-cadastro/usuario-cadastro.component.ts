import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { UsuarioService } from './../usuario.service';
import { Permissao, Usuario } from 'src/app/core/model/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  todasPermissoes: Permissao[];


  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }


  ngOnInit() {
    const codigoUsuario = this.route.snapshot.params[`codigo`];

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.title.setTitle('Cadastro de usuário');
    this.usuarioService.todasPermissoes()
      .then(response => this.todasPermissoes = response);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form);
    }else {
      this.adicionarUsuario(form);
    }
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarUsuario(form: FormControl) {
    this.usuarioService.salvar(this.usuario)
    .then(() => {
      this.novo(form);
      this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
    .then(usuario => {
      this.usuario = usuario;
      this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.usuario.codigo);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de usuário: ${this.usuario.nome}`);
  }

}
