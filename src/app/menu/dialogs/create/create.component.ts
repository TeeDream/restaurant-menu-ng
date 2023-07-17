import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from '@src/app/core/types/product.interface';

// type CreateProduct = Omit<IProduct, 'id'>
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { [key: string]: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
