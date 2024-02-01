import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import config from '@/utils/constants';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  const body = await req.body();
  const signature = req.headers['Stripe-Signature'] as string;

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripeHookSecret!
    );
  } catch (error: any) {
    return res.status(400).json(`Webhook Error: ${error.message}`);
  }

  return res.json(null);
}
