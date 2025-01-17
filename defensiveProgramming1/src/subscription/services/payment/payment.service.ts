import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentGatewayResponseDto } from 'src/subscription/dtos/PaymentGatewayDto';
import { PurchaseSubscriptionDto } from 'src/subscription/dtos/PurchaseSubscriptionDto';
import { validateInputs } from 'src/subscription/utils/upgradeSubscription.util';
import { PaymentEntityDatabaseService } from './PaymentEntityDatabaseService';
import { SubscriptionRepository } from 'src/subscription/repositories/subscription.repository';

@Injectable()
export class PaymentService {
  constructor(
    private paymentEntityDatabaseService: PaymentEntityDatabaseService,
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async callPaymentGateway(
    paymentInfo: PurchaseSubscriptionDto,
  ): Promise<PaymentGatewayResponseDto> {
    const {
      name,
      cardNumber,
      cardCvv,
      cardExpiryMonth,
      cardExpiryYear,
      subscriptionId,
    } = paymentInfo;
    const validationErrors = validateInputs(paymentInfo);
    const errorString = validationErrors.join(',');

    if (validationErrors.length > 0) throw new BadRequestException(errorString);

    try {
      const subscription =
        await this.subscriptionRepository.findById(subscriptionId);
      if (!subscription)
        throw new BadRequestException(
          `Subscription not found for id ${subscriptionId}`,
        );

      const paymentResponse = await axios.post(
        'https://payment.gateway.com/api/pay',
        {
          name,
          cardNumber,
          cardCvv,
          cardExpiryMonth,
          cardExpiryYear,
          subscription,
        },
      );

      const paymentInfo: PaymentGatewayResponseDto = paymentResponse.data;

      if (paymentResponse.status === 200) {
        const transactionInfo =
          await this.paymentEntityDatabaseService.insertOne(paymentInfo);
        return {
          transactionInfo: transactionInfo.transaction,
          successMessage: 'Transaction complete',
          errorMessage: '',
        };
      } else {
        return {
          errorMessage: paymentInfo.errorMessage,
          successMessage: '',
        };
      }
    } catch (error) {
      return {
        successMessage: '',
        errorMessage: error.message,
      };
    }
  }
}
