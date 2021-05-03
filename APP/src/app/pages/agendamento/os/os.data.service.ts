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
export class DataServiceOrdemdeServico {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getClientes(): Observable<any[]>{
      const url = `${apiUrl}/clientes`;
      return this.http.get<any[]>(url).pipe(
        tap(() => console.log('fetched clientes')),
        catchError(this.handleError('getClientes', []))
      );
  }

  getFuncionarios(): Observable<any[]>{
    const url = `${apiUrl}/funcionarios`;
    return this.http.get<any[]>(url).pipe(
      tap(() => console.log('fetched funcionarios')),
      catchError(this.handleError('getFuncionarios', []))
    );
}


  
postAgedamentoInclusao(
  cliente: number,
  funcionario: string,
  data: Date,
  prioridade: string,
  assunto: string,
  observacao: string
): Observable<any> {
  const url = `${apiUrl}/agendamentoinclusao`;
  const textAplicacao ={cliente:cliente,funcionario:funcionario,data:data,prioridade:prioridade,assunto:assunto,observacao:observacao}
  console.log(textAplicacao);
  const json = JSON.stringify(textAplicacao);
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
}