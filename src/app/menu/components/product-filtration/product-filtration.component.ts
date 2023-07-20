import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, Observable, Subject, takeUntil } from 'rxjs';
import { CategoryInterface } from '@src/app/core/types';

@Component({
  selector: 'app-product-filtration',
  templateUrl: './product-filtration.component.html',
  styleUrls: ['./product-filtration.component.scss'],
})
export class ProductFiltrationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public categories!: CategoryInterface[];
  public formCategories!: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Output() productFilters = new EventEmitter<string[]>();
  @Input() categories$!: Observable<CategoryInterface[]>;

  protected createFormCategory() {
    return this.categories.reduce(
      (acc, category) => {
        acc[category.id.toString()] = false;
        return acc;
      },
      {} as {
        [key: string]: boolean;
      }
    );
  }

  public sanitizeCategory(category: string): string {
    return category.replaceAll(/[_-]/g, ' ');
  }

  public clearCategories(): void {
    this.formCategories.reset();
  }

  public ngOnInit(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categories = categories;
      this.formCategories = this.fb.group(this.createFormCategory());
      this.formCategories.valueChanges
        .pipe(
          debounceTime(300),
          map((category) =>
            Object.entries(category)
              .filter((category) => category[1])
              .map((selectedCategory) => selectedCategory[0])
          ),
          takeUntil(this.destroy$)
        )
        .subscribe((data) => this.productFilters.emit(data));
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
