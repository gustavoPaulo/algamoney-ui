import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Permissao, Usuario } from './../../core/model/model';
import { environment } from 'src/environments/environment';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  intensPorPagina = 5;
}

@Injectable()
export class UsuarioService {

  ususariosUrl: string;


  constructor(private http: HttpClient) {
    this.ususariosUrl = `${environment.apiUrl}/usuarios`;
   }


   pesquisar(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.intensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.ususariosUrl}`,
      { params })
      .toPromise()
      .then(response => {
        const usuarios = response[`content`];
        const resultado = {
          usuarios,
          total: response[`totalElements`]
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.ususariosUrl}/${codigo}`)
      .toPromise().then(() => null);
  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.ususariosUrl}`)
      .toPromise()
      .then(response => response[`content`]);
  }

  salvar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.post<Usuario>(this.ususariosUrl, usuario, { headers })
      .toPromise();
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put<Usuario>(`${this.ususariosUrl}/${usuario.codigo}`,
      usuario, { headers })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(`${this.ususariosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const usuario = response as Usuario;
        return usuario;
      });
  }

  todasPermissoes(): Promise<any> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(`${environment.apiUrl}/permissoes`, { headers })
      .toPromise()
      .then(response => {
        const todasPermissoes = response;
        return todasPermissoes;
      })
    }

}
