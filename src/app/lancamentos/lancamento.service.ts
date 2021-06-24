import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Lancamento } from 'src/app/core/model/model';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  intensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;


  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }


  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.intensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
      { params })
      .toPromise()
      .then(response => {
        const lancamentos = response[`content`];
        const resultado = {
          lancamentos,
          total: response[`totalElements`]
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise().then(() => null);
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl,
      Lancamento.toJson(lancamento), { headers })
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,
    Lancamento.toJson(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Lancamento;

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        return lancamento;
      });
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  calendarioEmPortugues(): any {
    const br = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
                          'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };

    return br;
  }

}
