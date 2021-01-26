import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:5000';
@Injectable({
        providedIn: 'root'
    })
    export class DataService {

    constructor(private http: HttpClient) {}

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    postLogin(nome, senha): Observable<any> {
      const url = `${apiUrl}/login`;
      const textAplicacao = '{"login":"' + nome + '","senha":"' + senha + '"}';
      const json = JSON.parse(textAplicacao);
      return this.http.post<any>(url, json, {
        observe: 'body',
        responseType: 'json'
          }).pipe(
        tap(_ => console.log(`pass`)),
        catchError(this.handleError<any>(`ERRO POST`))
      );
    }
  }