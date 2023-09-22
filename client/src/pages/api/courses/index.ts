// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { NextResponse } from 'next/server';
import { getCourses } from '@/actions/courses';
import { ApiResponseData } from '@/types/api';
import { Course } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Course>>
) {
  try {
    switch (req.method) {
      case 'POST':
        const { type, title, categoryId, description } = req.body;
        const course = await prisma.course.create({
          data: {
            authorId: '2',
            title,
            categoryId,
            slug: slugify(title),
          },
        });
        return NextResponse.json(course);
      case 'GET':
        const { page, limit } = req.query;
        const currentPage = typeof page === 'number' ? page : 1;
        const take = typeof limit === 'number' ? limit : 10;

        const courses = getCourses({ page: currentPage, limit: take });
        return NextResponse.json(courses);
      default:
        break;
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error);
  }
}
