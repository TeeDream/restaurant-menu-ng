import { MenuStateInterface } from '@src/app/menu/types/menuStateInterface';
import { createReducer, on } from '@ngrx/store';
import * as MenuActions from './actions';

export const initialState: MenuStateInterface = {
  isLoadingCategories: false,
  isLoadingProducts: false,
  categories: [],
  products: [],
  errorCategories: null,
  errorProducts: null,
};

export const reducers = createReducer(
  initialState,
  on(
    MenuActions.getCategories,
    (state): MenuStateInterface => ({ ...state, isLoadingCategories: true })
  ),
  on(
    MenuActions.getCategoriesFailure,
    (state, action): MenuStateInterface => ({
      ...state,
      isLoadingCategories: false,
      errorCategories: action.error,
    })
  ),
  on(
    MenuActions.getCategoriesSuccess,
    (state, action): MenuStateInterface => ({
      ...state,
      isLoadingCategories: false,
      categories: action.categories,
    })
  ),
  on(
    MenuActions.getProducts,
    (state): MenuStateInterface => ({
      ...state,
      isLoadingProducts: true,
    })
  ),
  on(
    MenuActions.getProductsFailure,
    (state, action): MenuStateInterface => ({
      ...state,
      isLoadingProducts: false,
      errorProducts: action.error,
    })
  ),
  on(
    MenuActions.getProductsSuccess,
    (state, action): MenuStateInterface => ({
      ...state,
      isLoadingProducts: false,
      products: action.products,
    })
  )
);
