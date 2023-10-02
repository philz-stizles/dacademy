import jwt from 'jsonwebtoken';
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

        // Check if user exists.
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
          throw new Error('credentials are invalid');
        }

        // Validate password.
        const isValid = await hashService.compare(
          password,
          existingUser.hashedPassword
        );
        if (!isValid) {
          throw new Error('credentials are invalid');
        }

        // Generate token.
        const token = jwt.sign(
          { id: existingUser.id },
          process.env.JWT_SECRET as string,
          { expiresIn: +(process.env.JWT_SECRET_EXPIRES_IN as string) } // This has been defined in
          // env variables in seconds 3600 * 24 => 60 * 60 * 24 => 24hrs
          // + is added to convert it from string to an integer as it will assume milliseconds
          // if string is detected
        );

        return res.status(200).json({
          status: true,
          message: 'Login Successful',
          data: {
            user: { email: existingUser.email, name: existingUser.name },
            token,
          },
        });
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
