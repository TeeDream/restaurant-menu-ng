import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { IProduct } from 'src/app/core/types/product.interface';
import { MenuFilters } from '@src/app/menu/types/menu.filters';
import { AuthService } from '@src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  constructor(private dataService: DataService, private auth: AuthService) {}

  products$!: Observable<IProduct[]>;
  isAuth$!: Observable<boolean>;

  private menuFilters: MenuFilters = {
    filters: [],
    query: '',
  };

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

  ngOnInit(): void {
    this.isAuth$ = this.auth.getLogInStatus$();
  }
}
