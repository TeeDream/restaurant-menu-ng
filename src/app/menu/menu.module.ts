import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';
// import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductFiltrationComponent } from './components/product-filtration/product-filtration.component';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [CommonModule, ProductFiltrationComponent],
  exports: [ProductFiltrationComponent, ProductItemComponent],
})
export class MenuModule {}
