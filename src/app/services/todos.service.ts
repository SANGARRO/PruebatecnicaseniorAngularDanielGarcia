import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {}

  getItems(param: string): Observable<any> {
    return this.http.get(this.apiUrl + param).pipe(catchError(this.handleError));
  }

  getOne(param: string): Observable<any> {
    return this.http.get(param).pipe(catchError(this.handleError));
  }

  updateItem(item: any): Observable<any> {
    return this.http.put(this.apiUrl + 'todos/' + item.id, item).pipe(catchError(this.handleError));
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'todos/' + id).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error(' error :', error);
    let errorMessage = ' error .';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
