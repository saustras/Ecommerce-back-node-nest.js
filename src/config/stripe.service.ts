import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Stripe from 'stripe';


@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createCharge(amount: number, currency: string, source: string, description: string) {
    return this.stripe.charges.create({
      amount,
      currency,
      source,
      description,
    });
  }
}