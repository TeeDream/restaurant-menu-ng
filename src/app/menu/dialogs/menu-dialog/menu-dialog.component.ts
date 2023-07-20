import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductInterface } from '@src/app/core/types/product.interface';
import { ModifyComponent } from '@src/app/menu/dialogs/modify/modify.component';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialogComponent {
  @Input() receivedProduct!: ProductInterface;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyComponent, {
      data: this.receivedProduct,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
