import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, take } from 'rxjs';
import { IProduct } from '../types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private readonly productsUrl = 'http://localhost:3000/products';

  public getProducts(filter: string[]): Observable<IProduct[]> {
    if (!filter.length) return of([]);

    return this.http
      .get<IProduct[]>(this.productsUrl, {
        params: {
          category: filter,
        },
      })
      .pipe(
        take(1),
        retry(1),
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
  }

  public productsByFilter(arr: string[]): Observable<IProduct[]> {
    return this.getProducts(arr);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(operation, error);

      return of(result as T);
    };
  }
}
