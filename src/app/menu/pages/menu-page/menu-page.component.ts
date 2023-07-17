import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { IProduct } from 'src/app/core/types/product.interface';
import { ProductSearchComponent } from '@src/app/menu/components/product-search/product-search.component';
import { ProductFiltrationComponent } from '@src/app/menu/components/product-filtration/product-filtration.component';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements AfterViewInit {
  constructor(private dataService: DataService) {}

  @ViewChild(ProductSearchComponent) searchProduct!: ProductSearchComponent;
  @ViewChild(ProductFiltrationComponent)
  filtrationProduct!: ProductFiltrationComponent;

  products$!: Observable<IProduct[]>;

  public filtersHandler(arr: string[]): void {
    this.products$ = this.dataService.productsByFilter(arr);
  }

  public filterHandler(str: string): void {
    this.products$ = this.dataService.productsBySearch(str);
  }

  public ngAfterViewInit(): void {
    merge(
      this.searchProduct.searchInput$,
      this.filtrationProduct.formCategories$
    ).subscribe((data) => console.log(data));
  }
}
