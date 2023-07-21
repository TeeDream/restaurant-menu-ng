import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '@src/app/core/services/data.service';
import { ProductInterface } from '@src/app/core/types';

interface DialogDataInterface {
  product: ProductInterface;
}

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss'],
})
export class DeleteProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface,
    private dataService: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dataService.deleteProduct(this.data.product.id).subscribe(() => {
      this.dataService.renewProducts$.next();
      this.onNoClick();
    });
  }
}
