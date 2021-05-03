import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
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
export class DataServiceAgendamento {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAgendamento(): Observable<any[]> {
    const url = `${apiUrl}/buscaagendamento`;
    return this.http.get<any[]>(url).pipe(
      tap((clientes) => console.log('fetched clientes')),
      catchError(this.handleError('getClientes', []))
    );
  }

  postAgendamentoExclusao(selecionado): Observable<any> {
   
    const textAplicacao ={id:selecionado}
    const json = JSON.stringify(textAplicacao);
    const url = `${apiUrl}/agendamentoexclusao`;
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

  postAgendamentoBusca(
    id: any,
  ): Observable<any> {
    const url = `${apiUrl}/agendamentobusca`;

    const textAplicacao ={id:id}
    const json = JSON.stringify(textAplicacao);
    return this.http
      .post<any>(url, json, {
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap((_) => console.log(`fetched busca`)),
        catchError(this.handleError<any>(`ERRO POST`))
      );
  }

  private osSource = new Subject <any>();
  os$ = this.osSource.asObservable();
  enviar(tarefa:any){
    this.osSource.next(tarefa)
  }
}

