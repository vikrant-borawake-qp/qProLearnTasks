import { IsNumber, IsString } from 'class-validator';
import { IPayment } from '../types/IPayment';

export class PaymentGatewayRequestDto {
  @IsString()
  userId: string;

  @IsString()
  cardNumber: string;

  @IsString()
  cardCvv: string;

  @IsString()
  cardExpiry: string;

  @IsNumber()
  amount: number;
}

export class PaymentGatewayResponseDto {
  @IsString()
  successMessage: string;

  @IsString()
  errorMessage: string;

  transactionInfo?: IPayment;
}
