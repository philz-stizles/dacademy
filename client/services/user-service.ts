import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';

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
  const existingUser = await prisma.user.findFirst({
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

export const update = async (
  filter: Prisma.UserWhereUniqueInput,
  data: Partial<Pick<User, 'email' | 'emailVerified'>>
) => {
  return await prisma.user.update({
    where: filter,
    data,
  });
};
