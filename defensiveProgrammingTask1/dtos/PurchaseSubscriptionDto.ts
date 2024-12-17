import {IsInt, IsString} from 'class-validator'

export class PurchaseSubscriptionDto {
  @IsString()
  name: string

  @IsString()
  cardNumber: string

  @IsString()
  cardCvv: string

  @IsString()
  cardExpiry: string

  @IsString()
  userId: string

  @IsInt()
  subscriptionId: number
}
