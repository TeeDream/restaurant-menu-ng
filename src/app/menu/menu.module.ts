import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductFiltrationComponent } from './components/product-filtration/product-filtration.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { CreateComponent } from './dialogs/create/create.component';
import { ModifyComponent } from './dialogs/modify/modify.component';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductFiltrationComponent,
    MenuPageComponent,
    ProductSearchComponent,
    CreateComponent,
    ModifyComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [ProductItemComponent, ProductFiltrationComponent],
})
export class MenuModule {}
