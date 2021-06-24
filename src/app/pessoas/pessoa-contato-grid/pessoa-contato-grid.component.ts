import { Component, Input } from '@angular/core';

import { PessoaCadastroComponent } from './../pessoa-cadastro/pessoa-cadastro.component';
import { Contato } from './../../core/model/model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-contato-grid',
  templateUrl: './pessoa-contato-grid.component.html',
  styleUrls: ['./pessoa-contato-grid.component.css']
})
export class PessoaContatoGridComponent{

  @Input() contatos = [];
  contato = new Contato();
  exibindoFormularioContato = false;
  contatoIndex: number;


  constructor(
    private pessoaCadastro: PessoaCadastroComponent,
    private messageService: MessageService,
    private confirmation: ConfirmationService
    ) { }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
    this.messageService.add({ severity: 'info', detail: 'Contato removido!' });
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(form: FormControl) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;

    const acao = this.editando ? 'alterado' : 'adicionado';

    form.reset();
    this.messageService.add({ severity: 'info', detail: `Contato ${acao}!` });
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome,
      contato.email, contato.telefone);
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }

}
