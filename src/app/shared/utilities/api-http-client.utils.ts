import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiHttpClient {
  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': 'eyJlbnZpcm9ubWVudCI6ImRldiIsImtleSI6IlZFQjBZVGRxTUVwdlRrQnVZWGxLTUdrelFrQmllWE5BWW5JeGJrQSJ9'
       })
    };
  }

  addContentTypeHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  get<T>(path): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, this.getHttpOptions());
  }

  post<T>(path, data): Observable<T> {
    const headers = new HttpHeaders();
    return this.http.post<T>(`${this.baseUrl}/${path}`, data, this.getHttpOptions());
  }

  put<T>(path, data): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${path}`, data, this.getHttpOptions());
  }

  delete<T>(path): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`, this.getHttpOptions());
  }
}
