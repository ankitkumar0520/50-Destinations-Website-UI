import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  constructor() {}

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(`${environment.apiBaseUrl}/${url}`)
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http
      .post<T>(`${environment.apiBaseUrl}/${url}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http
      .put<T>(`${environment.apiBaseUrl}/${url}`, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.apiBaseUrl}/${url}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.message) {
      errorMessage = `Server Error: ${error.message}`;
    } else if (error.status) {
      errorMessage = this.getServerErrorMessage(error);
    }

    // Log full error in SSR
    console.error('API Error (SSR or Browser):', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: error.message,
      error: error.error,
    });

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
        return `Error ${error.status}: ${error.message}`;
    }
  }
}
