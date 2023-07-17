import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();
  destroy$ = new Subject<void>();
  searchInput = new FormControl('');

  public clearInputValue(): void {
    this.searchInput.setValue('');
  }

  public ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((str) => {
        if (str !== null) this.filter.emit(str);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
