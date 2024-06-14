import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogingService {

  url = 'http://localhost:3000/';
  headersFile;

  constructor(private http: HttpClient) {
    this.headersFile = {
      responseType: "json"
    };
  }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  processData(userName:string, password:string): Observable<any>{
    console.log(`userName: ${userName},password: ${password}`);
    const body = {
      userName: userName,
      password:password

    }

    return this.http.post<any>(`${this.url}login/`,body )
    .pipe(
      catchError(this.handleError)
    );
  }
}
