import { Component, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';
import { IProduct } from './core/types/product.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}
  title = 'restaurant-menu';
  products$!: Observable<IProduct[]>;

  ngOnInit(): void {
    this.products$ = this.dataService.getProducts('');

    this.dataService.term$.subscribe((term) => {
      this.products$ = this.dataService.getProducts(term);
    });
  }
}
