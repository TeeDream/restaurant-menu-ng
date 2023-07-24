import { createAction, props } from '@ngrx/store';
import { CategoryInterface, ProductInterface } from '@src/app/core/types';

export const getCategories = createAction('[Menu] Get Categories');
export const getCategoriesSuccess = createAction(
  '[Menu] Get Categories success',
  props<{ categories: CategoryInterface[] }>()
);
export const getCategoriesFailure = createAction(
  '[Menu] Get Categories failure',
  props<{ error: string }>()
);
export const getProducts = createAction(
  '[Menu] Get Products',
  props<{
    filters: string[];
    query: string;
  }>()
);
export const getProductsFailure = createAction(
  '[Menu] Get Products failure',
  props<{ error: string }>()
);
export const getProductsSuccess = createAction(
  '[Menu] Get Products success',
  props<{ products: ProductInterface[] }>()
);
