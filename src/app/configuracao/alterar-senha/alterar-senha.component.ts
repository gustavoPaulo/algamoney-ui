import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Usuario } from 'src/app/core/model/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { AlterarSenhaService } from './alterar-senha.service';
import { LogoutService } from 'src/app/seguranca/logout.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  usuario = new Usuario();
  authSenha = this.auth;
  novaSenha: string;
  confirmarSenha: string;


  constructor(
    private alterarSenha: AlterarSenhaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private auth: AuthService,
    private title: Title,
    private logoutService: LogoutService,
    private router: Router
  ) { }


  ngOnInit() {
    const codigoUsuario = this.authSenha.jwtPayload.codigo;

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.title.setTitle('Alterar Senha');
  }

  carregarUsuario(codigo: number) {
    this.alterarSenha.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.usuario.senha = '';
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  validarSenha(form: FormControl) {
    this.alterarSenha
      .validarSenhaAntiga(this.usuario.codigo, this.usuario.senha)
      .then(response => {
        let senhasIguais = response;

        if (senhasIguais) {

          if (this.novaSenha && this.novaSenha.length >= 5) {

            if (this.novaSenha != this.usuario.senha) {

              if (this.confirmarSenha === this.novaSenha) {
                this.usuario.senha = this.novaSenha;
                this.atualizarUsuario(form);

              } else {
                this.messageService.add({ severity: 'info', detail: 'A confirmação deve ser igual a nova senha!' });
              }

            } else {
              this.messageService.add({ severity: 'info', detail: 'A nova senha deve ser diferente da senha antiga!' });
            }
          } else {
            this.messageService.add({ severity: 'info', detail: 'A nova senha deve contar mais que 5 caracteres.' });
          }

        } else {
            this.messageService.add({ severity: 'error', detail: 'A senha anitga não é a mesma do usuário atual!' });
        }
      });
  }

  atualizarUsuario(form: FormControl) {
    this.alterarSenha.atualizar(this.usuario)
    .then(usuario => {
      this.usuario = usuario;
      this.messageService.add({ severity: 'success', detail: 'Senha alterada com sucesso!' });
      this.novaSenha = '';
      this.confirmarSenha = '';
      this.logoutService.logout().then(() => {
        this.router.navigate(['/login']);
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de usuário: ${this.usuario.nome}`);
  }

}
