import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAllValues, IValue } from '../models/about-company-page.model';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {
  private API_URL = '/api/worths';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getValues(viewPages, skipPages): Observable<IAllValues> {
    const p = new HttpParams().set('top', viewPages).set('skip', skipPages);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: p
    };
    return this.http.get<IAllValues>(this.API_URL, httpOptions).pipe(
      tap( ),
      catchError(this.handleError)
    );
  }

  getValue(id: string): Observable<IValue> {
    return this.http
      .get<IValue>(`${this.API_URL}/${id}`, this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  addValue(value: IValue) {
    return this.http
      .post<IValue>(this.API_URL, JSON.stringify(value), this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  updateValue(id: string, value: IValue) {
    return this.http
      .put<void>(
        `${this.API_URL}/${id}`,
        JSON.stringify(value),
        this.httpOptions
      )
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  deleteValue(value: IValue) {
    return this.http
      .delete<void>(`${this.API_URL}/${value._id}`, this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  addImage(id: string, formData) {
    return this.http.post<IValue>(`${this.API_URL}/${id}/image`, formData).pipe(
      tap(),
      catchError(this.handleError)
    );
  }
}
