import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { ApiResponseData } from '@/types/api';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[[...nextauth]]';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import config from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseData<string>>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: false, message: 'Missing required fields' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    const user = { id: '', name: '', emailAddresses: [{ emailAddress: '' }] };

    let { courseId } = req.query as { courseId: string };
    if (!courseId) {
      return res
        .status(400)
        .json({ status: false, message: 'Selected a valid course' });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });
    if (!course) {
      return res
        .status(404)
        .json({ status: false, message: 'Selected course was not found' });
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    if (transaction) {
      return res
        .status(400)
        .json({ status: false, message: 'Course has already been purchased' });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${config.nextAppUrl}/courses/${course.id}?success=1`,
      cancel_url: `${config.nextAppUrl}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return res.json({
      status: true,
      data: checkoutSession.url,
      message: 'Checkout successful',
    });
  } catch (error: any) {
    console.log('[COURSE_PUBLISH]', error);
    return new NextResponse(error);
  }
}
