import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from '@src/app/core/types/product.interface';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
})
export class ModifyComponent {
  constructor(
    public dialogRef: MatDialogRef<ModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {}

  modifyProductGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    price: new FormControl(this.data.price, [Validators.required]),
    category: new FormControl(this.data.category, [Validators.required]),
    description: new FormControl(this.data.description),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }
}
