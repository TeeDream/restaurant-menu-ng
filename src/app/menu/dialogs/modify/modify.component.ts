import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductInterface } from '@src/app/core/types/product.interface';
import { CategoryInterface } from '@src/app/core/types';
import { DataService } from '@src/app/core/services/data.service';

interface ReceivedDataInterface {
  product: ProductInterface;
  categories: CategoryInterface[];
}

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
})
export class ModifyComponent {
  constructor(
    public dialogRef: MatDialogRef<ModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceivedDataInterface,
    private dataService: DataService
  ) {}

  modifyProductGroup = new FormGroup({
    name: new FormControl(this.data.product.name, [Validators.required]),
    price: new FormControl(this.data.product.price, [Validators.required]),
    category: new FormControl(this.data.product.category.id, [
      Validators.required,
    ]),
    description: new FormControl(this.data.product.description),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangesSubmit(): void {
    if (this.modifyProductGroup.invalid) return;
    const controls = this.modifyProductGroup.controls;

    this.dataService
      .updateProduct(this.data.product.id, {
        price: controls.price.value as number,
        name: controls.name.value as string,
        description: controls.description.value as string,
        categoryId: controls.category.value as number,
      })
      .subscribe(() => {
        this.dataService.renewProducts$.next();
        this.dialogRef.close(this.modifyProductGroup.value);
      });
  }
}
