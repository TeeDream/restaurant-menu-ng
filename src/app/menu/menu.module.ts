import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductFiltrationComponent } from './components/product-filtration/product-filtration.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ModifyComponent } from './dialogs/modify/modify.component';
import { MenuDialogComponent } from './dialogs/menu-dialog/menu-dialog.component';
import { InputRestrictionDirective } from './directives/input-restriction.directive';
import { DeleteProductComponent } from './dialogs/delete-product/delete-product.component';
import { DeleteProductDialogComponent } from './dialogs/delete-product-dialog/delete-product-dialog.component';
import { CreateProductBtnComponent } from './dialogs/create-product-btn/create-product-btn.component';
import { CreateProductDialogComponent } from './dialogs/create-product-dialog/create-product-dialog.component';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductFiltrationComponent,
    MenuPageComponent,
    ProductSearchComponent,
    ModifyComponent,
    MenuDialogComponent,
    InputRestrictionDirective,
    DeleteProductComponent,
    DeleteProductDialogComponent,
    CreateProductBtnComponent,
    CreateProductDialogComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [ProductItemComponent, ProductFiltrationComponent],
})
export class MenuModule {}
