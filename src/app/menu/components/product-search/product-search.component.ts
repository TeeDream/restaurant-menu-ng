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
  destroy$: Subject<void> = new Subject<void>();
  searchInput = new FormControl('');

  clearInputValue(): void {
    this.searchInput.setValue('');
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((str) => {
        if (str === null) return;

        this.filter.emit(str);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
