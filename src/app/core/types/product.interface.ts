import { CategoryInterface } from '@src/app/core/types/categoryInterface';

export interface ProductInterface {
  id: number;
  price: number;
  name: string;
  description?: string;
  categoryId: number;
  category: CategoryInterface;
}
