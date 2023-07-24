import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MenuActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DataService } from '@src/app/core/services/data.service';

@Injectable()
export class MenuEffects {
  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MenuActions.getCategories),
      mergeMap(() => {
        return this.dataService.getCategories().pipe(
          map(
            (categories) => MenuActions.getCategoriesSuccess({ categories }),
            catchError((error) =>
              of(MenuActions.getCategoriesFailure({ error: error.message }))
            )
          )
        );
      })
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MenuActions.getProducts),
      mergeMap((payload) => {
        return this.dataService.getFilteredProducts(payload).pipe(
          map(
            (products) => MenuActions.getProductsSuccess({ products }),
            catchError((error) =>
              of(MenuActions.getProductsFailure({ error: error.message }))
            )
          )
        );
      })
    );
  });
  
  constructor(private actions$: Actions, private dataService: DataService) {}
}
