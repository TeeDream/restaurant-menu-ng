import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class ProductSearchComponent {
  @Output() filter = new EventEmitter<string>();
}
