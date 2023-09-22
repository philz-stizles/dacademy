import { prisma } from '@/lib/prisma';
import { COURSES } from '@/data';
import { Course } from '@prisma/client';
import { AuthorCourse } from '@/types/course';
import { TransformedCourse } from '@/models/course';

type Query = {
  filter?: object;
  page?: number;
  limit?: number;
};

export const getCourses = async ({ filter, page, limit }: Query) => {
  try {
    page = page || 1;
    const take = limit || 10;
    const skip = (page - 1) * take;
    const courses =
      COURSES.slice(0, take || COURSES.length) ||
      (await prisma.course.findMany({
        where: filter,
        skip,
        take,
        orderBy: {},
      }));
    return courses;
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
    return await prisma.course.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error: any) {
    console.error('GET MY COURSES: ', error);
    return [];
  }
};

export const getCourse = async (slug?: string) => {
  let course: TransformedCourse | null | undefined = null;

  try {
    course = COURSES.find((course) => course.slug === slug);
    // course = await prisma.course.findFirst({
    //   where: { slug },
    // });
  } catch (error: any) {
    console.error('GET COURSE: ', error);
  }

  return course === undefined ? null : course;
};

export const getAuthorCourse = async (courseId: string) => {
  let course: AuthorCourse | null = null;

  try {
    course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        attachments: true,
        chapters: true,
      },
    });
  } catch (error: any) {
    console.error('GET AUTHOR COURSE: ', error);
  }

  return course;
};
