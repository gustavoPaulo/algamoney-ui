import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Cidade, Estado, Pessoa } from '../core/model/model';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  intensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;


  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
   }


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.intensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`,
      { params })
      .toPromise()
      .then(response => {
        const pessoas = response[`content`];
        const resultado = {
          pessoas,
          total: response[`totalElements`]
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise().then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise().then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => response[`content`]);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,
      pessoa, { headers })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response as Pessoa;
        return pessoa;
      });
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params }).toPromise();
  }

}
