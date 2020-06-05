import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IEvent } from '../models/news-page.model';
import { IAllLeaderships, ILeadership } from '../models/leaderships-page.model';

@Injectable({
  providedIn: 'root'
})
export class LeadershipsPageService {
  private API_URL = '/api/leaderships';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getLeaderships(viewPages, skipPages): Observable<IAllLeaderships> {
    const p = new HttpParams().set('top', viewPages).set('skip', skipPages);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: p
    };
    return this.http.get<IAllLeaderships>(this.API_URL, httpOptions).pipe(
      tap( ),
      catchError(this.handleError)
    );
  }

  getLeadership(id: string): Observable<ILeadership> {
    return this.http
      .get<ILeadership>(`${this.API_URL}/${id}`, this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  addLeadership(event: ILeadership) {
    return this.http
      .post<ILeadership>(this.API_URL, JSON.stringify(event), this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  updateLeadership(id: string, event: ILeadership) {
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

  deleteLeadership(event: ILeadership) {
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

  addImage(id: string, formData) {
    return this.http
      .post<ILeadership>(`${this.API_URL}/${id}/image`, formData)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }
}
