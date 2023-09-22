import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'; 
import { NextResponse } from 'next/server';
import { ApiResponseData } from '@/types/api';
import { Course } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[[...nextauth]]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Course>>
) {
  if (req.method !== 'PATCH') {
    return res
      .status(405)
      .json({ status: false, message: 'Missing required fields' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    const authorId = session?.user?.name as string;

    let { courseId } = req.query;
    courseId = courseId as string;
    if (!courseId) {
      return res
        .status(400)
        .json({ status: false, message: 'Selected a valid course' });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        authorId,
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: 'Selected course was not found' });
    }

    const unpublishedCourse = await prisma.course.update({
      where: {
        id: courseId,
        authorId,
      },
      data: {
        isPublished: false,
      },
    });

    return res.json({
      status: true,
      data: unpublishedCourse,
      message: 'Course unpublished successfully',
    });
  } catch (error: any) {
    console.log('[COURSE_UNPUBLISH]', error);
    return new NextResponse(error);
  }
}
