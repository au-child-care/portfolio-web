import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiHttpClient {
  constructor(private http: HttpClient) {}

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': environment.apiKey
       })
    };
  }

  addContentTypeHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  get<T>(path): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${path}`, this.getHttpOptions());
  }

  post<T>(path, data): Observable<T> {
    const headers = new HttpHeaders();
    return this.http.post<T>(`${environment.apiUrl}/${path}`, data, this.getHttpOptions());
  }

  put<T>(path, data): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${path}`, data, this.getHttpOptions());
  }

  delete<T>(path): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${path}`, this.getHttpOptions());
  }
}
