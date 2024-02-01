import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponseData } from '@/types/api';
import { Attachment } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';
import withErrorHandler from '@/middlewares/with-error-handler';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Attachment>>
) => {
  if (req.method !== 'DELETE') {
    return res
      .status(405)
      .json({ status: false, message: 'Missing required fields' });
  }

  const currentUser = await getCurrentUser(req, res);
  const authorId = currentUser.id;

  const { courseId, attachmentId } = req.query as {
    courseId: string;
    attachmentId: string;
  };
  if (!courseId) {
    return res
      .status(400)
      .json({ status: false, message: 'Selected a valid course' });
  }

  if (!courseId) {
    return res
      .status(400)
      .json({ status: false, message: 'Selected a valid attachment' });
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

  const attachment = await prisma.attachment.delete({
    where: {
      id: attachmentId,
      courseId,
    },
  });

  return res.json({
    status: true,
    data: attachment,
    message: 'Deleted successfully',
  });
};

export default withErrorHandler(handler);
