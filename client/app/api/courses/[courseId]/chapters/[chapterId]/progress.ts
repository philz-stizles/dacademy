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
    const { isCompleted } = await req.body;
    let { courseId, chapterId } = req.query as {
      courseId: string;
      chapterId: string;
    };

    return res.json({
      status: true,

      message: 'Success',
    });
  } catch (error: any) {
    console.log('[CHAPTER_PUBLISH', error);
    return new NextResponse(error);
  }
}
