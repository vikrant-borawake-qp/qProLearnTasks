import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { PurchaseSubscriptionDto } from "./dtos/PurchaseSubscriptionDto";
import { validateInputs } from "./utils/purchaseSubscription.util";
import axios from "axios";
import { uuid } from "@modules/survey-draft/util/uuidUtil";
import { SubscriptionRepository } from "./repositories/subscription.repository";
import { ProcessPaymentService } from "./services/ProcessPaymentService";

@Controller("purchase")
export class PurchaseController {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private processPaymentService: ProcessPaymentService
  ) {}

  @Post("upgradeSubscription")
  async processPurchase(
    @Body() purchaseSubscriptionDto: PurchaseSubscriptionDto
  ): Promise<{ status: string; transactionId: string; error?: string }> {
    const { name, cardCvv, cardExpiry, cardNumber } = purchaseSubscriptionDto;
    const validationError = validateInputs(purchaseSubscriptionDto);

    if (validationError)
      throw new HttpException(validationError, HttpStatus.BAD_REQUEST);

    const transactionInfo = this.processPaymentService.callPaymentGateway({
      name,
      cardCvv,
      cardExpiry,
      cardNumber,
    });

    if (paymentResponse.status === 200)
      return {
        status: "Success",
        transactionId: uuid(),
        transaction: transactionInfo,
      };
    return {
      status: "Internal server error",
      transactionId: "",
      error: "Insufficient funds",
    };
  }
}
