import { prisma } from '@/lib/prisma';

export const update = async (
  authorId: string,
  courseId: string,
  update: any
) => {
  return await prisma.course.update({
    where: {
      id: courseId,
      authorId,
    },
    data: {
      ...update,
    },
  });
};

export const findOne = async ({
  authorId,
  courseId,
}: {
  authorId: string;
  courseId: string;
}) => {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
      authorId,
    },
  });
};
