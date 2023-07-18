import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { IProduct } from 'src/app/core/types/product.interface';
import { MenuFilters } from '@src/app/menu/types/menu.filters';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  constructor(private dataService: DataService) {}

  products$!: Observable<IProduct[]>;
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
}
