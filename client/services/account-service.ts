import { prisma } from '@/lib/prisma';

export const findByUser = async (userId: string) => {
  return await prisma.account.findFirst({
    where: {
      userId,
    },
  });
};
