import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { IProduct } from 'src/app/core/types/product.interface';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  products$!: Observable<IProduct[]>;

  public filtersHandler(arr: string[]) {
    this.products$ = this.dataService.productsByFilter(arr);
  }

  public trackByFn(index: number, name: IProduct): number {
    return name.id;
  }

  ngOnInit(): void {
    console.log('first');
  }
}
