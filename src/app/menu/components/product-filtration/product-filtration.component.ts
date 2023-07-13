import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, filter, map, tap } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
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
    // MaterialModule
  ],
})
export class ProductFiltrationComponent implements OnInit {
  constructor(private fb: FormBuilder, private dataService: DataService) {}

  categories$!: Observable<string>;
  categories = [...FILTER_CATEGORIES];
  formCategories = this.fb.group(this.createFormCategory());
  test = new FormControl('');

  createFormCategory() {
    return this.categories.reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {} as BuilderFormCategory);
  }

  ngOnInit(): void {
    this.test.valueChanges.subscribe((data) => console.log(data));
    this.formCategories.valueChanges
      .pipe(
        tap((data) => console.log(data)),
        map((data) =>
          Object.entries(data)
            .filter((data) => data[1])
            .map((term) => term[0])
            .join(' ')
        )
      )
      .subscribe((data) => {
        this.dataService.term$.next(data);
      });
  }
}
