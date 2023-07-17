import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, take } from 'rxjs';
import { CategoryInterface, IProduct } from '@src/app/core/types';
import { MenuFilters } from '@src/app/menu/types/menu.filters';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private readonly BASE_URL = 'http://localhost:3000/';
  private readonly PRODUCTS = 'products';
  private readonly CATEGORIES = 'categories';

  public getFilteredProducts({
    filters,
    query,
  }: MenuFilters): Observable<IProduct[]> {
    if (!filters.length && !query) return of([]);

    return this.http
      .get<IProduct[]>(this.BASE_URL + this.PRODUCTS, {
        params: query
          ? { category: filters, name_like: query }
          : { category: filters },
      })
      .pipe(
        take(1),
        retry(3),
        catchError(this.handleError<IProduct[]>('getFilteredProducts', []))
      );
  }

  public createProduct(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post(
      this.BASE_URL + this.PRODUCTS,
      product
    ) as Observable<IProduct>;
  }

  public updateProduct(
    id: number,
    obj: Partial<IProduct>
  ): Observable<IProduct> {
    return this.http.patch<IProduct>(
      this.BASE_URL + this.PRODUCTS + `/${id}`,
      obj
    );
  }

  public deleteProduct(id: number): Observable<object> {
    return this.http.delete(this.BASE_URL + this.PRODUCTS + `/${id}`);
  }

  public updateCategory(
    id: number,
    obj: Partial<CategoryInterface>
  ): Observable<CategoryInterface> {
    return this.http.patch<CategoryInterface>(
      this.BASE_URL + this.CATEGORIES + `/${id}`,
      obj
    );
  }

  public deleteCategory(id: number): Observable<object> {
    return this.http.delete(this.BASE_URL + this.CATEGORIES + `/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(operation, error);

      return of(result as T);
    };
  }
}
