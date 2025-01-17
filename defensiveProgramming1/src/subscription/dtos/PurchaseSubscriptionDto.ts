import { IsInt, IsString } from 'class-validator';

export class PurchaseSubscriptionDto {
  @IsString()
  name: string;

  @IsString()
  cardNumber: string;

  @IsString()
  cardCvv: string;

  @IsInt()
  cardExpiryMonth: number;

  @IsInt()
  cardExpiryYear: number;

  @IsString()
  userId: string;

  @IsInt()
  subscriptionId: number;
}
