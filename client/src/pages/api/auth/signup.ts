import { prisma } from '@/lib/prisma';
import hashService from '@/services/hash-service';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData<T> = {
  status: boolean;
  message: string;
  data: T;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<{} | null>>
) {
  try {
    switch (req.method) {
      case 'POST':
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const user = await prisma.user.create({
          data: {
            email,
            hashedPassword: await hashService.hash(password),
            instructor: { create: {} },
          },
        });

        return res
          .status(200)
          .json({ status: true, message: 'Hello from Next.js!', data: user });
      default:
        throw new Error('Method not supported');
    }
  } catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).json({
      status: false,
      message: error.message || 'Something went wrong',
      data: null,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
