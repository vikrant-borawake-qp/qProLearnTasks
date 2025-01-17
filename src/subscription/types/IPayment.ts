import { PaymentModeEnum } from '../enums/PaymentModeEnum';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';

export interface IPayment {
  id: number;
  amount: number;
  userId: string;
  status: PaymentStatusEnum;
  paymentTimestamp: Date;
  isError?: boolean;
  errorMessage?: string;
  paymentMode: PaymentModeEnum;
}
