import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, of, retry, Subject, take } from 'rxjs';
import { CategoryInterface, ProductInterface } from '@src/app/core/types';
import { MenuFilters } from '@src/app/menu/types/menu.filters';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  private readonly BASE_URL = 'http://localhost:3000/';
  private readonly PRODUCTS = 'products';
  private readonly CATEGORIES = 'categories';
  public renewProducts$ = new Subject<void>();
  public renewCategories$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getFilteredProducts({
    filters,
    query,
  }: MenuFilters): Observable<ProductInterface[]> {
    if (!filters.length && !query) return of([]);

    return this.http
      .get<ProductInterface[]>(this.BASE_URL + this.PRODUCTS, {
        params: query
          ? { categoryId: filters, name_like: query, _expand: 'category' }
          : { categoryId: filters, _expand: 'category' },
      })
      .pipe(
        take(1),
        retry(3),
        catchError(
          this.handleError<ProductInterface[]>('getFilteredProducts', [])
        )
      );
  }

  public createProduct(
    product: Omit<ProductInterface, 'id' | 'category'>
  ): Observable<ProductInterface> {
    return this.http.post(
      this.BASE_URL + this.PRODUCTS,
      product
    ) as Observable<ProductInterface>;
  }

  public updateProduct(
    id: number,
    product: Partial<ProductInterface>
  ): Observable<ProductInterface> {
    return this.http
      .patch<ProductInterface>(
        this.BASE_URL + this.PRODUCTS + `/${id}`,
        product
      )
      .pipe(retry(2), take(1));
  }

  public deleteProduct(id: number): Observable<object> {
    return this.http.delete(this.BASE_URL + this.PRODUCTS + `/${id}`);
  }

  public getCategories(): Observable<CategoryInterface[]> {
    return this.http
      .get<CategoryInterface[]>(this.BASE_URL + this.CATEGORIES)
      .pipe(retry(2), take(1));
  }

  public createCategory({
    name,
  }: Omit<CategoryInterface, 'id'>): Observable<CategoryInterface[]> {
    return this.http
      .post<CategoryInterface[]>(this.BASE_URL + this.CATEGORIES, { name })
      .pipe(retry(2), take(1));
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

  public deleteCategory({ id }: CategoryInterface): Observable<object> {
    return this.http
      .delete<CategoryInterface>(this.BASE_URL + this.CATEGORIES + `/${id}`)
      .pipe(retry(2), take(1));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error): Observable<T> => {
      console.error(operation, error);

      return of(result as T);
    };
  }

  public ngOnDestroy(): void {
    this.renewProducts$.complete();
  }
}
