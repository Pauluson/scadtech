import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAllContacts, IContact } from '../models/contacts-page.model';
import { IPartners } from '../models/partners-page.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsPageService {
  private API_URL = '/api/contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getContacts(viewPages, skipPages): Observable<IAllContacts> {
    const p = new HttpParams().set('top', viewPages).set('skip', skipPages);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: p
    };
    return this.http.get<IAllContacts>(this.API_URL, httpOptions).pipe(
      tap( )
      ,
      catchError(this.handleError)
    );
  }

  getContact(id: string): Observable<IContact> {
    return this.http
      .get<IContact>(`${this.API_URL}/${id}`, this.httpOptions)
      .pipe(
        tap( )
        ,
        catchError(this.handleError)
      );
  }

  addContact(contact: IContact) {
    return this.http
      .post<IContact>(this.API_URL, JSON.stringify(contact), this.httpOptions)
      .pipe(
        tap( )
        ,
        catchError(this.handleError)
      );
  }

  updateContact(id: string, contact: IContact) {
    return this.http
      .put<void>(
        `${this.API_URL}/${id}`,
        JSON.stringify(contact),
        this.httpOptions
      )
      .pipe(
        tap( )
        ,
        catchError(this.handleError)
      );
  }

  deleteContact(contact: IContact) {
    return this.http
      .delete<void>(`${this.API_URL}/${contact._id}`, this.httpOptions)
      .pipe(
        tap( )
        ,
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
      .post<IContact>(`${this.API_URL}/${id}/image`, formData)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }
}
