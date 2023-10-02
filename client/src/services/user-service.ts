import { prisma } from '@/lib/prisma';

export type UserCreateInput = {
  email: string;
  hashedPassword: string;
  name?: string;
};

export const create = async (data: UserCreateInput) => {
  return await prisma.user.create({
    data: {
      ...data,
      instructor: { create: {} },
    },
  });
};

export const findByEmail = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return existingUser;
};

export const findById = async (id: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return existingUser;
};
