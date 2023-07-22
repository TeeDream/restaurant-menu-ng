import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryDialogComponent } from '@src/app/menu/dialogs/create-category-dialog/create-category-dialog.component';

@Component({
  selector: 'app-create-category-btn',
  templateUrl: './create-category-btn.component.html',
  styleUrls: ['./create-category-btn.component.scss'],
})
export class CreateCategoryBtnComponent {
  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '600px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
