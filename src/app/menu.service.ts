import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MenuItem } from './menu-item';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  appetizersUrl = '/data/appetizers.json';
  mainCoursesUrl = '/data/main-courses.json';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAppetizers(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.appetizersUrl).pipe(
      tap(appetizers => this.messageService.add(`fetched appetizers`)),
      catchError(this.handleError('getAppetizers', []))
    );
  }

  getMainCourses(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.mainCoursesUrl).pipe(
      tap(mainCourses => this.messageService.add(`fetched mainCourses`)),
      catchError(this.handleError('getMainCourses', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
