import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from '@src/app/menu/dialogs/delete-product-dialog/delete-product-dialog.component';
import { ProductInterface } from '@src/app/core/types';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent {
  @Input() receivedProduct!: ProductInterface;

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      data: {
        product: this.receivedProduct,
      },
      width: '250px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
    });
  }
}
