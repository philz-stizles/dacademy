import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

type UserCreateInput = Pick<Category, 'title'>;

export const create = async (data: UserCreateInput) => {
  return await prisma.category.create({
    data: {
      ...data,
    },
  });
};

export const findByTitle = async (title: string) => {
  return await prisma.category.findUnique({
    where: {
      title,
    },
  });
};

export const findById = async (id: string) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};
