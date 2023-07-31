import { CategoryInterface } from '@src/app/core/types/categoryInterface';

export interface ProductInterface {
  id: string;
  price: number;
  name: string;
  description?: string;
  categoryId: string;
  hot?: boolean;
  category: CategoryInterface;
}
