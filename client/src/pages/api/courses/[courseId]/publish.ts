// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
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
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: 'Selected course was not found' });
    }

    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );

    if (
      !course.title ||
      !course.description ||
      !course.coverImage ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return res
        .status(400)
        .json({ status: false, message: 'Missing required fields' });
    }

    const publishedCourse = await prisma.course.update({
      where: {
        id: courseId,
        authorId,
      },
      data: {
        isPublished: true,
      },
    });

    return res.json({
      status: true,
      data: publishedCourse,
      message: 'Course published successfully',
    });
  } catch (error: any) {
   console.log('[COURSE_PUBLISH]', error);
    return new NextResponse(error);
  }
}
