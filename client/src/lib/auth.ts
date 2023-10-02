import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[[...nextauth]]';

export const getCurrentUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    throw Error('Unauthorized');
    // return res.status(401).json({ status: false, message: 'Unauthorized' });
  }
  return session.user;
};
