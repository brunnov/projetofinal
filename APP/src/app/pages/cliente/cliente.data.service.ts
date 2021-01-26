import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { json } from 'body-parser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = 'http://localhost:5000';
@Injectable({
  providedIn: 'root',
})
export class DataServiceCliente {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getClientes(): Observable<any[]> {
    const url = `${apiUrl}/clientes`;
    return this.http.get<any[]>(url).pipe(
      tap((clientes) => console.log('fetched clientes')),
      catchError(this.handleError('getClientes', []))
    );
  }
  getFormaPagamento(): Observable<any[]> {
    const url = `${apiUrl}/formaPagamento`;
    return this.http.get<any[]>(url).pipe(
      tap((clientes) => console.log('fetched formaPagamento')),
      catchError(this.handleError('formaPagamento', []))
    );
  }
  postClientes(id: string): Observable<any> {
    const url = `${apiUrl}/cliente`;
    const textAplicacao =
    '{"id":"' +
    id + '"}';
    const textjson = JSON.parse(textAplicacao);
    return this.http
      .post<any>(url, textjson, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap((_) => console.log(`fetched procura`)),
        catchError(this.handleError<any>(`ERRO POST`))
      );
    }
  postClientesInclusao(
    nome: string,
    email: string,
    endereco: string,
    login: string,
    cpf_cnpj: string,
    telefone: string,
    senha: string,
    responsavel: string
  ): Observable<any> {
    const url = `${apiUrl}/clienteinclusao`;

    const textAplicacao =
      '{"nome":"' +
      nome +
      '","email":"' +
      email +
      '","endereco":"' +
      endereco +
      '","cpf_cnpj":"' +
      cpf_cnpj +
      '","senha": "' +
      senha +
      '","telefone":"' +
      telefone +
      '","login":"' +
      login+
      '","responsavel":"' +
      responsavel +
      '"}';
    console.log(textAplicacao);
    const json = JSON.parse(textAplicacao);
    return this.http
      .post<any>(url, json, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap((_) => console.log(`fetched inclusão`)),
        catchError(this.handleError<any>(`ERRO POST`))
      );
  }
  postClienteEdicao(
    id: any,
    nome: string,
    email: string,
    endereco: string,
    cpf_cnpj: string,
    telefone: string,
    senha: string,
    pagamento: any[],
    responsavel: string,
    diaPagamento: string
  ): Observable<any> {
    const url = `${apiUrl}/clienteedicao`;

    const textAplicacao =
      '{"nome":"' +
      nome +
      '","email":"' +
      email +
      '","endereco":"' +
      endereco +
      '","cpf_cnpj":"' +
      cpf_cnpj +
      '","senha": "' +
      senha +
      '","telefone":"' +
      telefone +
      '","pagamento":"' +
      pagamento +
      '","responsavel":"' +
      responsavel +
      '","diaPagamento":"' +
      diaPagamento +
      '","id":"' +
      id +
      '" }';
    console.log(textAplicacao);
    const json = JSON.parse(textAplicacao);
    return this.http
      .post<any>(url, json, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap((_) => console.log(`fetched inclusão`)),
        catchError(this.handleError<any>(`ERRO POST`))
      );
  }
  postClientesExclusao(selecionado): Observable<any> {
    let x = [];
    x = selecionado;
    let textAplicacao = '{"id":[';
    // tslint:disable-next-line: only-arrow-functions
    for (let i = 0; i < x.length; i++) {
      textAplicacao += '"' + x[i] + '"';
      if (i < x.length - 1) {
        textAplicacao += ',';
      } else {
        textAplicacao += ']}';
      }
    }
    const url = `${apiUrl}/clienteexclusao`;
    const json = JSON.parse(textAplicacao);
    console.log(json)
    return this.http
      .post<any>(url, json, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap((_) => console.log(`fetched exclusão`)),
        catchError(this.handleError<any>(`ERRO POST`))
      );
  }
}
