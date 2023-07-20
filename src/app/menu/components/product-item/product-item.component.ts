import { Component, Input } from '@angular/core';
import { ProductInterface } from 'src/app/core/types/product.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: ProductInterface;
  @Input() isAuth!: boolean | null;
  @Input() isAdmin!: boolean;
  @Input() isEditing!: boolean;
}
