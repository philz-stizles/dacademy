import { Course, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { Query } from '@/utils/api';
import {
  FullCourse,
  TransformedAuthorCourse,
  TransformedCourse,
} from '@/types/course';

export const getCourses = async ({
  filter,
  page,
  limit,
}: Query<Pick<Course, 'isPublished'>>) => {
  try {
    page = page ?? 1;
    const take = limit ?? 10;
    const skip = (page - 1) * take;
    console.log(take, skip)
    const courses = await prisma.course.findMany({
      where: filter,
      include: {
        author: true,
        category: true,
      },
      skip,
      take,
      orderBy: {},
    });
    return courses.map(
      ({ createdAt, updatedAt, author, category, ...rest }) => {
        const {
          hashedPassword,
          createdAt: acAt,
          updatedAt: auAt,
          ...authorProps
        } = author as User;
        return {
          ...rest,
          author: {
            ...authorProps,
            createdAt: acAt.toISOString(),
            updatedAt: auAt.toISOString(),
          },
          category: !category
            ? null
            : {
                ...category,
                createdAt: category?.createdAt.toISOString(),
                updatedAt: category?.updatedAt.toISOString(),
              },
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
        };
      }
    );
  } catch (error: any) {
    console.error('GET COURSES: ', error);
    return [];
  }
};

export const getMyCourses = async ({ filter, page, limit }: Query) => {
  try {
    return getCourses({ filter, page, limit });
  } catch (error: any) {
    console.error('GET MY COURSES: ', error);
    return [];
  }
};

export const getAuthorCourses = async (authorId: string) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses.map(({ createdAt, updatedAt, ...rest }) => ({
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    }));
  } catch (error: any) {
    console.error('GET MY COURSES: ', error);
    return [];
  }
};

export const getCourse = async (slug?: string) => {
  let transformedCourse:
    | Omit<TransformedCourse, 'wsl' | 'chapters' | 'attachments'>
    | null
    | undefined = null;

  try {
    const course = await prisma.course.findFirst({
      where: { slug },
    });
    const { createdAt, updatedAt, ...rest } = course as Course;
    transformedCourse = {
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  } catch (error: any) {
    console.error('GET COURSE: ', error);
  }

  return transformedCourse ?? null;
};

export const getAuthorCourse = async (courseId: string) => {
  let authorCourse: TransformedAuthorCourse | null = null;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        attachments: true,
        chapters: true,
      },
    });
    const { createdAt, updatedAt, chapters, attachments, ...rest } =
      course as FullCourse;
    authorCourse = {
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      chapters: chapters.map(({ createdAt, updatedAt, ...rest }) => ({
        ...rest,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      })),
      attachments: attachments.map(({ createdAt, updatedAt, ...rest }) => ({
        ...rest,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      })),
    };
  } catch (error: any) {
    console.error('GET AUTHOR COURSE: ', error);
  }

  return authorCourse;
};

const groupByCourse = (transactions: any[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  transactions.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        course: {
          authorId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(transactions);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = transactions.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log('[GET_ANALYTICS]', error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
