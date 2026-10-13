import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto.js';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.getOrThrow('STRIPE_SECRET_KEY'),
    );
  }

  async createCharge({ paymentMethodId, amount }: CreateChargeDto) {
    return this.stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount * 100,
      confirm: true,
      allowed_payment_method_types: ['card'],
      currency: 'usd',
    });
  }
}
