import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponseData } from '@/types/api';
import { Attachment } from '@prisma/client';
import withErrorHandler from '@/middlewares/with-error-handler';
import { getCurrentUser } from '@/lib/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Attachment>>
) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: false, message: 'Missing required fields' });
  }

  const currentUser = await getCurrentUser(req, res);
  const authorId = currentUser.id;
  
  const { url } = req.body;
  const { courseId } = req.query as { courseId: string };
  if (!courseId) {
    return res
      .status(400)
      .json({ status: false, message: 'Selected a valid course' });
  }

  if (!url) {
    return res
      .status(400)
      .json({ status: false, message: 'Attachment url is required' });
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

  const attachment = await prisma.attachment.create({
    data: {
      url,
      name: url.split('/').pop(),
      courseId,
    },
  });

  return res.json({
    status: true,
    data: attachment,
    message: 'Created successfully',
  });
};

export default withErrorHandler(handler);
