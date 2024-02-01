import { prisma } from '@/lib/prisma';

export const update = async (
  courseId: string,
  chapterId: string,
  update: any
) => {
  return await prisma.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      ...update,
    },
  });
};

export const findOne = async ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  return await prisma.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
  });
};

export const deleteOne = async ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  return await prisma.chapter.delete({
    where: {
      id: chapterId,
      courseId,
    },
  });
};
