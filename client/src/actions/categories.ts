import { prisma } from '@/lib/prisma';
import { Query } from '@/utils/api';

export const getCategories = async (query: Query<{}>) => {
  try {
    const categories = await prisma.category.findMany();
    return categories.map(({ createdAt, updatedAt, ...rest }) => ({
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    }));
  } catch (error: any) {
    console.error('GET CATEGORIES: ', error);
    return [];
  }
};

export const getCategory = async () => {};
