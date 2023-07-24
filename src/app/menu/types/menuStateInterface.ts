import { CategoryInterface, ProductInterface } from '@src/app/core/types';

export interface MenuStateInterface {
  isLoadingCategories: boolean;
  isLoadingProducts: boolean;
  categories: CategoryInterface[];
  products: ProductInterface[];
  errorCategories: string | null;
  errorProducts: string | null;
}
