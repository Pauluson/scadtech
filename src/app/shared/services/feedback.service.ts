import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAllFeedbacks, IFeedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private API_URL = '/api/feedback';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getFeedbacks(viewPages, skipPages): Observable<IAllFeedbacks> {
    const p = new HttpParams().set('top', viewPages).set('skip', skipPages);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: p
    };
    return this.http.get<IAllFeedbacks>(this.API_URL, httpOptions).pipe(
      tap( ),
      catchError(this.handleError)
    );
  }

  getFeedback(id: string): Observable<IFeedback> {
    return this.http
      .get<IFeedback>(`${this.API_URL}/${id}`, this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  addFeedback(feedback: IFeedback) {
    return this.http
      .post<IFeedback>(this.API_URL, JSON.stringify(feedback), this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  updateFeedback(feedback: IFeedback) {
    return this.http
      .put<void>(
        `${this.API_URL}/${feedback._id}`,
        JSON.stringify(feedback),
        this.httpOptions
      )
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  deleteFeedback(feedback: IFeedback) {
    return this.http
      .delete<void>(`${this.API_URL}/${feedback._id}`, this.httpOptions)
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
}
