import { prisma } from '@/lib/prisma';
import { TransformedChapter } from '@/types/course';
import { Query } from '@/utils/api';
import { Chapter } from '@prisma/client';

export const getChapters = async (query: Query<{}>) => {
  try {
    const categories = await prisma.category.findMany();
    return categories.map(({ createdAt, updatedAt, ...rest }) => ({
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    }));
  } catch (error: any) {
    console.error('GET CATEGORIES: ', error);
    return [];
  }
};

export const getChapter = async (id: string, courseId: string) => {
  let transformedChapter: TransformedChapter | null = null;

  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id, courseId },
      include: {
        muxData: true,
      },
    });
    if (chapter) {
      const { createdAt, updatedAt, ...rest } = chapter;
      transformedChapter = {
        ...rest,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      };
    }
  } catch (error: any) {
    console.error('GET CHAPTER: ', error);
  }

  return transformedChapter;
};
