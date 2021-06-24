import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }


  handle(errorResponse: any) {
    let msg: string;
    let msgInfo: string;

    if (typeof errorResponse === 'string') {
        msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msgInfo = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {

      if (errorResponse.status === 400
          && errorResponse.error[0].mensagemDesenvolvedor.indexOf('Duplicate entry') > -1) {
            msgInfo = 'Esse usuário já possui essa permissão!';
          }

      if (errorResponse.status === 403) {
        msg = 'Seu usuário não tem permissão para executar esta ação.';
      } else {
        msg = 'Ocorreu um erro ao processar a sua solicitação';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    if (msg) {
      this.messageService.add({ severity: 'error', detail: msg });
    }
    if (msgInfo) {
      this.messageService.add({ severity: 'info', detail: msgInfo });
    }
  }

}
