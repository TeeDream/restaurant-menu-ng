import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  of,
  retry,
  take,
  tap,
} from 'rxjs';
import { IProduct } from '../types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private productsUrl = 'http://localhost:3000/products';
  // term$ = new Subject<string>();
  term$ = new BehaviorSubject<string>('');
  // check group click => from control array

  getProducts(filter: string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.productsUrl, {
        params: {
          category: filter ? filter.split(' ') : [],
        },
      })
      .pipe(
        tap((data) => console.log(data)),
        take(1),
        retry(1),
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(operation, error);

      return of(result as T);
    };
  }
}
