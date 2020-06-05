import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IInformation } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private API_URL = '/api/customization/information';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getInformation(): Observable<IInformation> {
    return this.http.get<IInformation>(this.API_URL, this.httpOptions).pipe(
      tap( ),
      catchError(this.handleError)
    );
  }

  updateInformation(product: IInformation) {
    return this.http
      .post<void>(`${this.API_URL}`, JSON.stringify(product), this.httpOptions )
      .pipe( tap( ),
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
