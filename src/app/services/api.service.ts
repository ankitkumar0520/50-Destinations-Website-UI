import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${url}`)
      .pipe(takeUntilDestroyed(this.destroyRef), catchError(this.handleError));
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${url}`, body)
      .pipe(takeUntilDestroyed(this.destroyRef), catchError(this.handleError));
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${url}`, body)
      .pipe(takeUntilDestroyed(this.destroyRef), catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${url}`)
      .pipe(takeUntilDestroyed(this.destroyRef), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    const isBrowserError =
      typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent;

    if (isBrowserError) {
      // Client-side error (browser environment only)
      errorMessage = `Client-side error: ${error.error.message}`;
      console.error('Client-side API Error:', error.error);
    } else {
      // Server-side error (SSR or backend)
      errorMessage = this.getServerErrorMessage(error);
      console.error('Server-side API Error:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
        error: error.error,
      });
    }

    return throwError(() => new Error(errorMessage));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Bad Request: The server cannot process the request.';
      case 401:
        return 'Unauthorized: Please authenticate.';
      case 403:
        return 'Forbidden: You do not have permission to access this resource.';
      case 404:
        return 'Not Found: The requested resource was not found.';
      case 500:
        return 'Internal Server Error: Please try again later.';
      default:
        return `Server Error: ${error.status} - ${
          error.statusText || error.message
        }`;
    }
  }
}
