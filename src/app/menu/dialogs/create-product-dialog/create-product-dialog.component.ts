import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '@src/app/core/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryInterface } from '@src/app/core/types';

interface DialogDataInterface {
  categories: CategoryInterface[];
}

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss'],
})
export class CreateProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface,
    private dataService: DataService
  ) {}

  createProductGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateSubmit(): void {
    if (this.createProductGroup.invalid) return;
    const controls = this.createProductGroup.controls;

    this.dataService
      .createProduct({
        price: controls.price.value as number,
        name: controls.name.value as string,
        description: controls.description.value as string,
        categoryId: Number(controls.category.value),
      })
      .subscribe(() => {
        this.onNoClick();
        this.dataService.renewProducts$.next();
      });
  }
}
