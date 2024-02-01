import { prisma } from '@/lib/prisma';
 

export const create = async (data: {
  email: string;
  token: string;
  expires: Date;
}) => {
  return await prisma.passwordResetToken.create({
    data,
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.passwordResetToken.findFirst({
    where: {
      email,
    },
  });
};

export const findByToken = async (token: string) => {
  return await prisma.passwordResetToken.findFirst({
    where: {
      token,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.passwordResetToken.delete({
    where: {
      id,
    },
  });
};
