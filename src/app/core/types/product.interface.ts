import { CategoryInterface } from '@src/app/core/types/categoryInterface';

export interface ProductInterface {
  id: number;
  price: string;
  name: string;
  description?: string;
  categoryId: number;
  category: CategoryInterface;
}
