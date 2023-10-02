import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const withErrorHandler =
  (handler: NextApiHandler, caller?: string) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return handler(req, res);
    } catch (error: any) {
      console.error(`[${caller ?? 'UNKNOWN'}] =>`, error);
      const statusCode = error.statusCode || 500;
      const errorMessage = error.message || 'Something went wrong';

      return res.status(statusCode).json({
        status: false,
        message: errorMessage,
        data: null,
      });
    }
  };

export default withErrorHandler;
