import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ProductInterface } from 'src/app/core/types/product.interface';
import { MenuFilters } from '@src/app/menu/types/menu.filters';
import { AuthService } from '@src/app/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryInterface } from '@src/app/core/types';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  public products$!: Observable<ProductInterface[]>;
  public categories!: CategoryInterface[];
  public categories$!: Observable<CategoryInterface[]>;
  public isAuth$!: Observable<boolean>;
  public isAdmin!: boolean;
  public isEditing = false;
  private menuFilters: MenuFilters = {
    filters: [],
    query: '',
  };

  constructor(
    private dataService: DataService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  public menuCategoriesHandler(arr: string[]): void {
    this.menuFilters.filters = arr;
    this.getProducts();
  }

  public menuQueryHandler(query: string): void {
    this.menuFilters.query = query;
    this.getProducts();
  }

  private getProducts(): void {
    this.products$ = this.dataService.getFilteredProducts(this.menuFilters);
  }

  private setStreamCategories(): void {
    this.categories$ = this.dataService.getCategories();
  }

  public ngOnInit(): void {
    this.setStreamCategories();
    this.isAuth$ = this.auth.getLogInStatus$();
    this.isAdmin = this.auth.isAdmin;
    this.isEditing = this.route.routeConfig?.path === 'menu/edit';
  }
}
