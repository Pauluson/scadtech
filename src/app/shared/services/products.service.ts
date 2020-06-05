import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAllProducts, IProduct } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = '/api/productions';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getProducts(viewPages, skipPages): Observable<IAllProducts> {
    const p = new HttpParams().set('top', viewPages).set('skip', skipPages);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: p
    };
    return this.http.get<IAllProducts>(this.API_URL, httpOptions).pipe(
      tap( ),
      catchError(this.handleError)
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${this.API_URL}/${id}`, this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  addProduct(product: IProduct) {
    return this.http
      .post<IProduct>(this.API_URL, JSON.stringify(product), this.httpOptions)
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  updateProduct(id: string, product: IProduct) {
    return this.http
      .put<void>(
        `${this.API_URL}/${id}`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(
        tap( ),
        catchError(this.handleError)
      );
  }

  deleteProduct(product: IProduct) {
    return this.http
      .delete<void>(`${this.API_URL}/${product._id}`, this.httpOptions)
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
