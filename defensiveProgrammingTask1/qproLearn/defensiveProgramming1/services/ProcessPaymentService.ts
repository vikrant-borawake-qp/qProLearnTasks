import {Injectable} from '@nestjs/common'
import {PaymentGatewayResponseDto} from '../dtos/PaymentGatewayDto'
import {PaymentEntityDatabaseService} from './PaymentEntityDatabaseService'
import {IPayment} from '../types/IPayment'
import axios from 'axios'

@Injectable()
export class ProcessPaymentService {
  constructor(
    private paymentEntityDatabaseService: PaymentEntityDatabaseService,
  ) {}

  async callPaymentGateway(
    paymentInfo: IPaymentGatewayRequestDto,
  ): Promise<PaymentGatewayResponseDto> {
    const {name, cardNumber, cardCvv, cardExpiry} = paymentInfo

    try {
      const paymentResponse = await axios.post(
        'https://payment.gateway.com/api/pay',
        {name, cardNumber, cardCvv, cardExpiry},
      )

      const transactionInfo = await this.paymentEntityDatabaseService.insertOne(
        paymentResponse,
      )
      return {status: 'Success', transactionId: uuid(), transactionInfo.transaction}
    } catch (error) {
      return {
        successMessage: '',
        errorMessage: error.message,
        transactionId: null,
      }
    }
  }
}

interface IPaymentGatewayRequestDto {
  name: string
  cardNumber: string
  cardCvv: string
  cardExpiry: string
}
