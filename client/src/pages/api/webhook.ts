import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import config from '@/utils/constants';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 });
  }

  const body = await req.body();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripeHookSecret!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  return new NextResponse(null, { status: 200 });
}
