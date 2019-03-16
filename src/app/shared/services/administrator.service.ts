import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Administrator } from '../dtos/administrator.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AdministratorService {

  private administratorsUrl = 'http://localhost:8000/api/administrator';  // URL to web api

  constructor(
    private http: HttpClient) { }

  getAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(this.administratorsUrl)
      .pipe(
        tap(_ => this.logInfo('fetched administrators')),
        catchError(this.handleError('getAdministrators', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private logInfo(message: string) {
    console.info(message);
  }

  private logError(message: string) {
    console.error(message);
  }
}
