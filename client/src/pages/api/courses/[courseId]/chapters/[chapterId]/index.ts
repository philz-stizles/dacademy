import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { ApiResponseData } from '@/types/api';
import { Chapter } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';
import withErrorHandler from '@/middlewares/with-error-handler';
import config from '@/utils/constants';

const { Video } = new Mux(config.muxAccessToken, config.muxSecretKey);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Chapter>>
) => {
  if (!['PATCH', 'DELETE'].includes(req.method!)) {
    return res
      .status(405)
      .json({ status: false, message: 'Missing required fields' });
  }

  if (req.method === 'PATCH') {
    try {
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
          ...rest,
        },
      });

      if (rest.videoUrl) {
        const existingMuxData = await prisma.muxData.findFirst({
          where: {
            chapterId,
          },
        });

        if (existingMuxData) {
          await Video.Assets.del(existingMuxData.assetId);
          await prisma.muxData.delete({
            where: {
              id: existingMuxData.id,
            },
          });
        }

        const asset = await Video.Assets.create({
          input: rest.videoUrl,
          playback_policy: 'public',
          test: false,
        });

        await prisma.muxData.create({
          data: {
            chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id,
          },
        });
      }

      return res.json({
        status: true,
        data: updatedChapter,
        message: 'Updated successfully',
      });
    } catch (error: any) {
      console.log('[CHAPTER_UPDATE]', error);
      return new NextResponse(error);
    }
  }

  if (req.method === 'DELETE') {
    const currentUser = await getCurrentUser(req, res);
    const authorId = currentUser.id;

    const { title } = await req.body;
    let { courseId } = req.query as {
      courseId: string;
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
  }
};

export default withErrorHandler(handler);
