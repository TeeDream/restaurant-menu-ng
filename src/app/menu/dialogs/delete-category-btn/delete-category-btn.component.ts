import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryInterface } from '@src/app/core/types';
import { DeleteCategoryDialogComponent } from '@src/app/menu/dialogs/delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-delete-category-btn',
  templateUrl: './delete-category-btn.component.html',
  styleUrls: ['./delete-category-btn.component.scss'],
})
export class DeleteCategoryBtnComponent {
  @Input() category!: CategoryInterface;

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: {
        category: this.category,
      },
      width: '250px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      console.log('you have deleted', result);
    });
  }
}
