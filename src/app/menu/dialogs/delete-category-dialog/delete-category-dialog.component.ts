import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '@src/app/core/services/data.service';
import { CategoryInterface } from '@src/app/core/types';

interface DialogDataInterface {
  category: CategoryInterface;
}

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss'],
})
export class DeleteCategoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface,
    private dataService: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dataService.deleteCategory(this.data.category).subscribe(() => {
      this.dataService.renewCategories$.next();
      this.onNoClick();
    });
  }
}
