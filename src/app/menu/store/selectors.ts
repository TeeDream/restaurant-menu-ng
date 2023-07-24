import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuStateInterface } from '@src/app/menu/types/menuStateInterface';

export const featureKey = 'menu';
export const selectFeature =
  createFeatureSelector<MenuStateInterface>(featureKey);
// export const selectFeature = (state: AppStateInterface) => state.menu;
export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoadingCategories
);

export const selectCategories = createSelector(
  selectFeature,
  (state) => state.categories
);
export const selectError = createSelector(
  selectFeature,
  (state) => state.errorCategories
);
