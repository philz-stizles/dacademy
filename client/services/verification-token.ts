import { prisma } from '@/lib/prisma';

export const create = async (data: {
  email: string;
  token: string;
  expires: Date;
}) => {
  return await prisma.verificationToken.create({
    data,
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });
};

export const findByToken = async (token: string) => {
  return await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.verificationToken.delete({
    where: {
      id,
    },
  });
};
