import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from './../../core/model/model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AlterarSenhaService {

  ususariosUrl: string;


  constructor(private http: HttpClient) {
    this.ususariosUrl = `${environment.apiUrl}/usuarios`;
   }

  atualizar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put<Usuario>(`${this.ususariosUrl}/senha/${usuario.codigo}`,
      usuario, { headers })
      .toPromise()
      .then(response => {
        const usuario = response as Usuario;
        return usuario;
      });
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

  validarSenhaAntiga(codigo: number, senha: string): Promise<any> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(`${this.ususariosUrl}/validar-senha/${codigo}/${senha}`,
      { headers })
      .toPromise();
  }

}
