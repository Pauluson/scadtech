import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProfile } from '../models/profile.model';
import { IFile } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private API_URL = '/api/customization/config';

  profileSettings: IProfile;

  get profile(): IProfile {
    return this.profileSettings;
  }

  set profile(val: IProfile) {
    this.profileSettings = val;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getData(): void {
    this.http.get<IProfile>(this.API_URL, this.httpOptions).subscribe((profile: IProfile) => {
      this.profile = profile;
      this.updateStyles(profile);
    });
  }

  getProfile() : Observable<IProfile> {
   return this.http.get<IProfile>(this.API_URL, this.httpOptions);
  }

  updateData(product: IProfile) {
    return this.http
      .post<void>(
        `${this.API_URL}`,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(
        tap(),
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
  addImage(formData) {
    return this.http.post<IFile>(`/i/upload`, formData).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  updateStyles(value: IProfile) {
    document.documentElement.style.setProperty('--color', value.color);
    document.documentElement.style.setProperty('--rgb-color', this.hexToRgb(value.color));
    document.documentElement.style.setProperty(
      '--background-image',
      `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAQMAAAC3/F3+AAAABlBMVEUAAACZmZl+9SADAAAAAnRSTlMAM8lDrC4AAAAOSURBVAjXY0AGPCCEDAABkgAZ9NAiqAAAAABJRU5ErkJggg==)`
    );
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const color = `${parseInt(result[ 1 ], 16)}, ${parseInt(result[ 2 ], 16)}, ${parseInt(result[ 3 ], 16)}`;
    return color;
  }

}
