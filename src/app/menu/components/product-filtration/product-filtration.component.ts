import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FILTER_CATEGORIES,
  filterCategories,
} from 'src/app/shared/constants/filterCategory';

type BuilderFormCategory = {
  [K in (typeof FILTER_CATEGORIES)[keyof filterCategories]]: boolean;
};

@Component({
  selector: 'app-product-filtration',
  templateUrl: './product-filtration.component.html',
  styleUrls: ['./product-filtration.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    JsonPipe,
    CommonModule,
  ],
})
export class ProductFiltrationComponent {
  constructor(private _formBuilder: FormBuilder) {}

  categories = [...FILTER_CATEGORIES];
  formCategories = this._formBuilder.group(this.createFormCategory());

  createFormCategory() {
    return this.categories.reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {} as BuilderFormCategory);
  }
}
