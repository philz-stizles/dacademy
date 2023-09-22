import type { NextApiRequest, NextApiResponse } from 'next';

import { CourseService } from '@/services';
import { Course } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[[...nextauth]]';
import { ApiResponseData } from '@/types/api';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Course>>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).send({ status: false, message: 'Unauthorized' });
    }

    const { courseId } = req.query;
    if (!courseId) {
      return res.status(400).send({
        status: false,
        message: 'Please select a course to update',
      });
    }

    switch (req.method) {
      case 'PATCH':
        const course = await CourseService.update(
          session?.user?.name!,
          courseId as string,
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
  } catch (error: any) {
    return res
      .status(500)
      .send({ status: false, message: 'failed to fetch data' });
  }
}
