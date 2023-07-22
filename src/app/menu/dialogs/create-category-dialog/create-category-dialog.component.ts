import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '@src/app/core/services/data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss'],
})
export class CreateCategoryDialogComponent {
  categoryName = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    private dataService: DataService
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onCreateClick(): void {
    if (this.categoryName.invalid) return;

    this.dataService
      .createCategory({
        name: this.categoryName.value as string,
      })
      .subscribe(() => {
        this.dataService.renewCategories$.next();
        this.onNoClick();
      });
  }
}
