import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, take } from 'rxjs';
import { IProduct } from '../types/product.interface';

interface CategoryInterface {
  id: number;
  categoryName: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private readonly productsUrl = 'http://localhost:3000/products';
  private readonly categoriesUrl = 'http://localhost:3000/categories';

  public getProducts(filter: string[]): Observable<IProduct[]> {
    if (!filter.length) return of([]);

    return this.http
      .get<IProduct[]>(this.productsUrl, { params: { category: filter } })
      .pipe(
        take(1),
        retry(1),
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
  }

  public createProduct(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post(this.productsUrl, product) as Observable<IProduct>;
  }

  public updateProduct(
    id: number,
    obj: Partial<IProduct>
  ): Observable<IProduct> {
    return this.http.patch<IProduct>(this.productsUrl + `/${id}`, obj);
  }

  public deleteProduct(id: number): Observable<object> {
    return this.http.delete(this.productsUrl + `/${id}`);
  }

  public updateCategory(
    id: number,
    obj: Partial<CategoryInterface>
  ): Observable<CategoryInterface> {
    return this.http.patch<CategoryInterface>(
      this.categoriesUrl + `/${id}`,
      obj
    );
  }

  public deleteCategory(id: number): Observable<object> {
    return this.http.delete(this.categoriesUrl + `/${id}`);
  }

  public productsByFilter(arr: string[]): Observable<IProduct[]> {
    return this.getProducts(arr);
  }

  public getProductsBySearch(query: string): Observable<IProduct[]> {
    if (!query) return of([]);

    return this.http
      .get<IProduct[]>(this.productsUrl, { params: { name_like: query } })
      .pipe(
        take(1),
        retry(1),
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
  }

  public productsBySearch(str: string): Observable<IProduct[]> {
    return this.getProductsBySearch(str);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(operation, error);

      return of(result as T);
    };
  }
}
