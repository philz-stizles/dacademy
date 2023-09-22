import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ApiResponseData } from '@/types/api';
import { Chapter } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[[...nextauth]]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Chapter>>
) {
  if (req.method !== 'PUT') {
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
    const { list } = await req.body;
    let { courseId } = req.query as {
      courseId: string;
      chapterId: string;
    };
    if (!courseId) {
      return res
        .status(400)
        .json({ status: false, message: 'Select a valid course' });
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

    for (let item of list) {
      await prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return res.json({
      status: true,
      message: 'Chapter reorder successfully',
    });
  } catch (error: any) {
    console.log('[CHAPTER_REORDER]', error);
    return new NextResponse(error);
  }
}
