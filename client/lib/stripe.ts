import config from '@/utils/constants';
import Stripe from 'stripe';

export const stripe = new Stripe(config.stripeApiKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});
