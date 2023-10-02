import ApiError from '@/error/api-error';
import withErrorHandler from '@/middlewares/with-error-handler';
import { AuthService } from '@/services';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

type ResponseData<T> = {
  status: boolean;
  message: string;
  data: T;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<{} | null>>
) => {
  switch (req.method) {
    case 'POST':
      const { email, password } = req.body;

      const user = await AuthService.signup(email, password);

      return res
        .status(200)
        .json({ status: true, message: 'Signup successful', data: user });
    default:
      throw new ApiError('Method not supported', 405);
  }
};

export default withErrorHandler(handler, '[SIGNUP] => ');
