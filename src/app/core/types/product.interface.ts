export type ProductCategory =
  | 'all-day_breakfast'
  | 'cold_appetizers'
  | 'homemade_meat_delicacies'
  | 'ukrainian_pickles'
  | 'salads'
  | 'soups'
  | 'hot_appetizers'
  | 'traditional_deruny'
  | 'dumplings'
  | 'meat_dishes'
  | 'fish_dishes'
  | 'side_dishes'
  | 'open_fire_dishes'
  | 'shashlik'
  | 'lyulya-kebab'
  | 'sauces'
  | 'bread_basket'
  | 'dessert';

export interface IProduct {
  id: number;
  price: string;
  name: string;
  description?: string;
  category: ProductCategory;
}
