import { prisma } from '@/lib/prisma';

export const update = async (
  courseId: string,
  attachmentId: string,
  update: any
) => {
  return await prisma.attachment.update({
    where: {
      id: attachmentId,
      courseId,
    },
    data: {
      ...update,
    },
  });
};

export const findOne = async ({
  courseId,
  attachmentId,
}: {
  courseId: string;
  attachmentId: string;
}) => {
  return await prisma.attachment.findUnique({
    where: {
      id: attachmentId,
      courseId,
    },
  });
};

export const deleteOne = async ({
  courseId,
  attachmentId,
}: {
  courseId: string;
  attachmentId: string;
}) => {
  return await prisma.attachment.delete({
    where: {
      id: attachmentId,
      courseId,
    },
  });
};
