// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ApiResponseData } from '@/types/api';
import { Category } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';
import { getCategories } from '@/actions/categories';
import { TransformedCategory } from '@/types/category';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<Category | TransformedCategory[]>>
) {
  try {
    switch (req.method) {
      case 'POST':
        const { title, description } = req.body;
        const currentUser = await getCurrentUser(req, res);

        const category = await prisma.category.create({
          data: {
            title,
            description,
          },
        });
        return res.status(201).json({
          status: true,
          message: 'Created successfully',
          data: category,
        });
      case 'GET':
        const { page, limit } = req.query;
        const currentPage = typeof page === 'number' ? page : 1;
        const take = typeof limit === 'number' ? limit : 10;
        const categories = await getCategories({
          page: currentPage,
          limit: take,
        });

        return res.json({
          status: true,
          message: 'Retrieved successfully',
          data: categories,
        });
      default:
        return res
          .status(405)
          .json({ status: false, message: 'Missing required fields' });
    }
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error);
  }
}
