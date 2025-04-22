import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log('Fluxo TAP', retornoAPI)),
      map(resultado => Array.isArray(resultado.items) ? resultado.items : [resultado.items]),
      // map(resultado => resultado.items),
      // não funcionou o trecho acima conforme o curso, pois o retorno da API é um objeto e não um array
      // o retorno da API é um objeto, mas o items é um array, então precisamos fazer a conversão
      tap(resultado => console.log('Fluxo após MAP', resultado))
    );
  }
}
