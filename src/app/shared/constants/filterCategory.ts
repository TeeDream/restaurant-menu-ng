export const FILTER_CATEGORIES = [
  'all-day_breakfast',
  'cold_appetizers',
  'homemade_meat_delicacies',
  'ukrainian_pickles',
  'salads',
  'soups',
  'hot_appetizers',
  'traditional_deruny',
  'dumplings',
  'meat_dishes',
  'fish_dishes',
  'side_dishes',
  'open_fire_dishes',
  'shashlik',
  'lyulya-kebab',
  'sauces',
  'bread_basket',
  'dessert',
] as const;

export type filterCategories =
  (typeof FILTER_CATEGORIES)[keyof typeof FILTER_CATEGORIES];
export type filterCategoriesKeys =
  (typeof FILTER_CATEGORIES)[keyof filterCategories];
