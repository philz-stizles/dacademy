import { Category, SubCategory } from '.prisma/client';

export type FullCategory = Category & {
  subCategories: SubCategory[];
};

export type TransformedCategory = Omit<Category, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
