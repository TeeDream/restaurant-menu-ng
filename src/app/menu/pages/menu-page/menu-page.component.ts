import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ProductInterface } from 'src/app/core/types/product.interface';
import { MenuFilters } from '@src/app/menu/types/menu.filters';
import { AuthService } from '@src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryInterface } from '@src/app/core/types';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit, OnDestroy {
  public products$!: Observable<ProductInterface[]>;
  public categories!: CategoryInterface[];
  public isAuth$!: Observable<boolean>;
  public isAdmin!: boolean;
  public isEditing = false;
  private destroy$ = new Subject<void>();
  private menuFilters: MenuFilters = {
    filters: [],
    query: '',
  };

  constructor(
    private dataService: DataService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public menuCategoriesHandler(arr: string[]): void {
    this.menuFilters.filters = arr;
    this.changeRoute();
  }

  public menuQueryHandler(query: string): void {
    this.menuFilters.query = query;
    this.changeRoute();
  }

  public getProducts(): void {
    this.products$ = this.dataService.getFilteredProducts(this.menuFilters);
  }

  private changeRoute(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.menuFilters.filters.length
          ? this.menuFilters.filters
          : null,
        query: this.menuFilters.query ? this.menuFilters.query : null,
      },
    });
  }

  public setCategories(): void {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  private setUpdateProductsSub(): void {
    this.dataService.renewProducts$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getProducts());
  }

  private setUpdateCategoriesSub(): void {
    this.dataService.renewCategories$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setCategories();
      });
  }

  private setRouteChangeSub() {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((data): void => {
        if (data.has('category') && !this.menuFilters.filters.length) {
          this.menuFilters.filters = data.getAll('category');
        }

        if (data.has('query') && !this.menuFilters.query) {
          this.menuFilters.query = data.get('query') as string;
        }

        this.getProducts();
      });
  }

  public ngOnInit(): void {
    this.setRouteChangeSub();
    this.setCategories();
    this.setUpdateProductsSub();
    this.setUpdateCategoriesSub();

    this.isAuth$ = this.auth.getLogInStatus$();
    this.isAdmin = this.auth.isAdmin;
    this.isEditing = this.route.routeConfig?.path === 'menu/edit';
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
