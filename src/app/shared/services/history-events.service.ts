import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  IAllHistoryEvents,
  IHistoryEvent
} from '../models/about-company-page.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryEventsService {
  private API_URL = '/api/history-events';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getHistoryEvents(viewPages, skipPages): Observable<IAllHistoryEvents> {
    const p = new HttpParams().set('top', viewPages).set('skip', skipPages);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: p
    };
    return this.http.get<IAllHistoryEvents>(this.API_URL, httpOptions).pipe(
      tap( ),
      catchError(this.handleError)
    );
  }

  getHistoryEvent(id: string): Observable<IHistoryEvent> {
    return this.http
      .get<IHistoryEvent>(`${this.API_URL}/${id}`, this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  addHistoryEvent(event: IHistoryEvent) {
    return this.http
      .post<IHistoryEvent>(
        this.API_URL,
        JSON.stringify(event),
        this.httpOptions
      )
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  updateHistoryEvent(id: string, event: IHistoryEvent) {
    return this.http
      .put<void>(
        `${this.API_URL}/${id}`,
        JSON.stringify(event),
        this.httpOptions
      )
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  deleteHistoryEvent(event: IHistoryEvent) {
    return this.http
      .delete<void>(`${this.API_URL}/${event._id}`, this.httpOptions)
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
