import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, debounceTime, map, takeUntil } from 'rxjs';
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
})
export class ProductFiltrationComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder) {}

  @Output() productFilters = new EventEmitter<string[]>();

  private destroy$ = new Subject<void>();
  public categories = [...FILTER_CATEGORIES];
  public formCategories = this.fb.group(this.createFormCategory());

  protected createFormCategory() {
    return this.categories.reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {} as BuilderFormCategory);
  }

  //TODO: FormControl?

  public sanitizeCategory(category: string): string {
    return category.replaceAll(/[_-]/g, ' ');
  }

  ngOnInit(): void {
    this.formCategories.valueChanges
      .pipe(
        debounceTime(300),
        map((data) =>
          Object.entries(data)
            .filter((data) => data[1])
            .map((term) => term[0])
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.productFilters.emit(data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
