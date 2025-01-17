import { Module } from '@nestjs/common';
import { UpgradeSubscriptionController } from './controllers/upgrade-subscription/upgrade-subscription.controller';
import { PaymentService } from './services/payment/payment.service';

@Module({
  controllers: [UpgradeSubscriptionController],
  providers: [PaymentService]
})
export class SubscriptionModule {}
