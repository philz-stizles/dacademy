import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponseData } from '@/types/api';
import { Chapter } from '@prisma/client';
import withErrorHandler from '@/middlewares/with-error-handler';
import { getCurrentUser } from '@/lib/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Chapter>>
) => {
  if (req.method !== 'PATCH') {
    return res
      .status(405)
      .json({ status: false, message: 'Missing required fields' });
  }

  const currentUser = await getCurrentUser(req, res);
  const authorId = currentUser.id;
  const { isPublished, ...rest } = await req.body;
  let { courseId, chapterId } = req.query as {
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
      .json({ status: false, message: 'Course was not found' });
  }

  const updatedChapter = await prisma.chapter.update({
    where: {
      id: chapterId,
      courseId,
    },
    data: {
      isPublished: false,
    },
  });

  return res.json({
    status: true,
    data: updatedChapter,
    message: 'Unpublished successfully',
  });
};

export default withErrorHandler(handler);
