import { prisma } from '@/lib/prisma';

export const findByUser = async (userId: string) => {
  return await prisma.twoFactorConfirmation.findFirst({
    where: {
      userId,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.twoFactorConfirmation.delete({
    where: {
      id,
    },
  });
};
