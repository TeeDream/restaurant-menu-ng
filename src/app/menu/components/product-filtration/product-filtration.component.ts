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
import { DataService } from '@src/app/core/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-filtration',
  templateUrl: './product-filtration.component.html',
  styleUrls: ['./product-filtration.component.scss'],
})
export class ProductFiltrationComponent implements OnInit, OnDestroy {
  @Input() isAdmin!: boolean;
  @Output() productFilters = new EventEmitter<string[]>();

  public categories$!: Observable<CategoryInterface[]>;
  public categories!: CategoryInterface[];
  public formCategories!: FormGroup;
  public isEditing = false;
  public isEdit = false;
  private destroy$ = new Subject<void>();
  private updateDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  private createFormCategory() {
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

  public toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  private setUpdateSub(): void {
    this.dataService.renewCategories$
      .asObservable()
      .pipe(takeUntil(this.updateDestroy$))
      .subscribe(() => {
        this.categories$ = this.dataService.getCategories();
        this.destroy$.next();
        this.subToForm();
      });
  }

  private subToForm(): void {
    this.categories$.subscribe((categories) => {
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

      this.route.queryParamMap
        .pipe(takeUntil(this.destroy$))
        .subscribe((params) => {
          const paramsArr = params.getAll('category');

          if (!paramsArr.length) return;
          const paramsObject = paramsArr.reduce((acc, param) => {
            acc[param] = true;

            return acc;
          }, {} as { [key: string]: boolean });

          this.formCategories.patchValue(paramsObject);
        });
    });
  }

  public ngOnInit(): void {
    this.isEdit = this.route.routeConfig?.path === 'menu/edit';
    this.categories$ = this.dataService.getCategories();
    this.subToForm();
    this.setUpdateSub();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.updateDestroy$.next();
    this.updateDestroy$.complete();
  }
}
