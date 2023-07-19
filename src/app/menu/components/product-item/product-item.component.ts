import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/core/types/product.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: IProduct;
  @Input() isAuth!: boolean | null;
  @Input() isAdmin!: boolean;
  @Input() isEditing!: boolean;
}
