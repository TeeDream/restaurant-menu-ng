import { Component, Input } from '@angular/core';
import { CategoryInterface } from '@src/app/core/types';
import { MatDialog } from '@angular/material/dialog';
import { ModifyCategoryDialogComponent } from '@src/app/menu/dialogs/modify-category-dialog/modify-category-dialog.component';

@Component({
  selector: 'app-modify-category-btn',
  templateUrl: './modify-category-btn.component.html',
  styleUrls: ['./modify-category-btn.component.scss'],
})
export class ModifyCategoryBtnComponent {
  @Input() category!: CategoryInterface;

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModifyCategoryDialogComponent, {
      data: {
        category: this.category,
      },
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      console.log('you have deleted', result);
    });
  }
}
