import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ApiResponseData } from '@/types/api';
import { Chapter } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[[...nextauth]]';
import { CourseService } from '@/services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Chapter>>
) {
  if (req.method !== 'POST') {
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
    const { title } = await req.body;
    let { courseId } = req.query as {
      courseId: string;
    };
    if (!courseId) {
      return res
        .status(400)
        .json({ status: false, message: 'Select a valid course' });
    }

    const course = await CourseService.findOne({
      courseId,
      authorId,
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: 'Selected course was not found' });
    }

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });

    return res.json({
      status: true,
      data: newChapter,
      message: 'Course published successfully',
    });
  } catch (error: any) {
    console.log('[CHAPTER_CREATE]', error);
    return new NextResponse(error);
  }
}
