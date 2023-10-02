import type { NextApiRequest, NextApiResponse } from 'next';
import { CourseService } from '@/services';
import { ApiResponseData } from '@/types/api';
import withErrorHandler from '@/middlewares/with-error-handler';
import { getCurrentUser } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<any>>
) => {
  const currentUser = await getCurrentUser(req, res);

  const { courseId } = req.query as { courseId: string };
  if (!courseId) {
    return res.status(400).send({
      status: false,
      message: 'Please select a course',
    });
  }

  switch (req.method) {
    case 'PATCH':
      const course = await CourseService.update(
        currentUser.id,
        courseId,
        req.body
      );
      return res.json({
        status: true,
        message: 'Course updated successfully',
        data: course,
      });
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
};

export default withErrorHandler(handler);
