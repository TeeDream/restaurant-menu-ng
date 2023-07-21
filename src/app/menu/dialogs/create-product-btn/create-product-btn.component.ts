import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '@src/app/menu/dialogs/create-product-dialog/create-product-dialog.component';
import { CategoryInterface } from '@src/app/core/types';

@Component({
  selector: 'app-create-product-btn',
  templateUrl: './create-product-btn.component.html',
  styleUrls: ['./create-product-btn.component.scss'],
})
export class CreateProductBtnComponent {
  @Input() categories!: CategoryInterface[];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      data: {
        categories: this.categories,
      },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
