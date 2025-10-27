import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(this.resolveUrl(endpoint), { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  post<T>(endpoint: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http
      .post<T>(this.resolveUrl(endpoint), body, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http
      .put<T>(this.resolveUrl(endpoint), body)
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(this.resolveUrl(endpoint))
      .pipe(catchError((error) => this.handleError(error)));
  }

  private resolveUrl(endpoint: string): string {
    if (!endpoint) {
      throw new Error('Endpoint must be provided');
    }

    const sanitizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return `${environment.apiUrl}/${sanitizedEndpoint}`.replace(/\/+$/, '');
  }

  private handleError(error: unknown) {
    return throwError(() => error);
  }
}
