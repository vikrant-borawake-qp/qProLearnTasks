import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/subscription/repositories/payment.repository';
import { IPayment } from 'src/subscription/types/IPayment';

@Injectable()
export class PaymentEntityDatabaseService {
  constructor(private paymentRepository: PaymentRepository) {}

  async insertOne(paymentInfo: IPayment): Promise<{
    transaction: IPayment | null;
    errorMessage?: string;
  }> {
    try {
      const transactionInfo =
        await this.paymentRepository.insertOne(paymentInfo);
      return {
        transaction: {
          amount: transactionInfo?.amount,
          id: transactionInfo?.id,
          paymentMode: transactionInfo?.paymentMode,
          userId: transactionInfo?.userId,
          status: transactionInfo?.status,
          paymentTimestamp: transactionInfo?.paymentTimestamp,
          isError: transactionInfo?.isError,
          errorMessage: transactionInfo?.errorMessage,
        },
      };
    } catch (error) {
      if (IS_DEV) {
        return {
          errorMessage: `Couldn't insert into the database: ` + error,
          transaction: null,
        };
      } else {
        return {
          errorMessage: `An error occurred while processing the payment. Please try again.`,
          transaction: null,
        };
      }
    }
  }
}
