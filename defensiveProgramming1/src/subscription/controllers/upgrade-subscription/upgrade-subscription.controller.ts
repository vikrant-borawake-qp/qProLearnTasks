import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseSubscriptionDto } from 'src/subscription/dtos/PurchaseSubscriptionDto';
import { PaymentService } from 'src/subscription/services/payment/payment.service';
import { IPayment } from 'src/subscription/types/IPayment';

@Controller('upgrade-subscription')
export class UpgradeSubscriptionController {
  constructor(private PaymentService: PaymentService) {}

  @Post('')
  async processPurchase(
    @Body() purchaseSubscriptionDto: PurchaseSubscriptionDto,
  ): Promise<{
    status: string;
    error?: string;
    transaction: IPayment | null;
  }> {
    try {
      const paymentResponse = await this.PaymentService.callPaymentGateway(
        purchaseSubscriptionDto,
      );
      return {
        status: HttpStatus.OK,
        transaction: paymentResponse.transactionInfo,
        error: '',
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.message,
        transaction: null,
      };
    }
  }
}
