// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { getCourses } from '@/actions/courses';
import { ApiResponseData } from '@/types/api';
import { Course } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';
import { TransformedCourse } from '@/models/course';
import withErrorHandler from '@/middlewares/with-error-handler';
import { FullCourse } from '@/types/course';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Course | any[]>>
) => {
   
    switch (req.method) {
      case 'POST':
        const { type, title, categoryId } = req.body;
        const currentUser = await getCurrentUser(req, res);

        const course = await prisma.course.create({
          data: {
            authorId: currentUser.id,
            type,
            title,
            categoryId,
            slug: slugify(title),
          },
        });
        return res.json({
          status: true,
          message: 'Created successfully',
          data: course,
        });
      case 'GET':
        const { page, limit } = req.query;
        const currentPage = typeof page === 'number' ? page : 1;
        const take = typeof limit === 'number' ? limit : 10;

        const courses = await getCourses({ page: currentPage, limit: take });

        return res.json({
          status: true,
          message: 'Retrieved successfully',
          data: courses,
        });
      default:
        return res
          .status(405)
          .json({ status: false, message: 'Missing required fields' });
    }
 
}

export default withErrorHandler(handler, 'COURSES');