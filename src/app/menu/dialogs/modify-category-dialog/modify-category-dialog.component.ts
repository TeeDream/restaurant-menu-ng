import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '@src/app/core/services/data.service';
import { CategoryInterface } from '@src/app/core/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface DialogDataInterface {
  category: CategoryInterface;
}

@Component({
  selector: 'app-modify-category-dialog',
  templateUrl: './modify-category-dialog.component.html',
  styleUrls: ['./modify-category-dialog.component.scss'],
})
export class ModifyCategoryDialogComponent {
  modifyGroup = new FormGroup({
    name: new FormControl(this.data.category.name, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<ModifyCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface,
    private dataService: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitChanges(): void {
    if (this.modifyGroup.invalid) return;

    this.dataService
      .updateCategory(this.data.category.id, {
        name: this.modifyGroup.value.name as string,
      })
      .subscribe(() => {
        this.dataService.renewCategories$.next();
        this.onNoClick();
      });
  }
}
