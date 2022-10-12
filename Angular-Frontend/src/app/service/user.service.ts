import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  REST_API: string = 'http://localhost:8000/api/users';

  httpHeaders=new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  createUser(data:User|any): Observable<any>{
    let API_URL = `${this.REST_API}/create`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError));

  }

   // Get single object
   getUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read/${id}`;
    return this.httpClient.post(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Update
  // updateUser(id: any, data: any): Observable<any> {
  //   let API_URL = `${this.REST_API}/update/${id}`;
  //   return this.httpClient
  //     .put(API_URL, data, { headers: this.httpHeaders })
  //     .pipe(catchError(this.handleError));
  // }

  updateUser(id: string, data: any) {
    return this.httpClient.put(`${this.REST_API}/update/${id}`, data)
      .pipe(retry(3), catchError(this.handleError));
  }


  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}

