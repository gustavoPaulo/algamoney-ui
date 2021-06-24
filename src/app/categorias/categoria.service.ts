import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { Categoria } from '../core/model/model';

export class CategoriaFiltro {
  nome: string;
  pagina = 0;
  intensPorPagina = 5;
}

@Injectable()
export class CategoriaService {

  categoriasUrl: string;


  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }


  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.intensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.categoriasUrl}`,
      { params })
      .toPromise()
      .then(response => {
        const categorias = response[`content`];
        const resultado = {
          categorias,
          total: response[`totalElements`]
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.categoriasUrl}/${codigo}`)
      .toPromise().then(() => null);
  }

  salvar(categoria: Categoria): Promise<Categoria> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.post<Categoria>(this.categoriasUrl, categoria, { headers })
      .toPromise();
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put<Categoria>(`${this.categoriasUrl}/${categoria.codigo}`,
      categoria, { headers })
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.get(`${this.categoriasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const categoria = response as Categoria;
        return categoria;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response[`content`]);
  }

}
