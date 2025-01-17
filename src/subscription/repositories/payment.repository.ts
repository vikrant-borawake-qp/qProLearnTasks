import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/Payment.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IPayment } from '../types/IPayment';

@Injectable()
export class PaymentRepository extends PaymentEntity {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  async findById(paymentId: number): Promise<PaymentEntity | null> {
    const paymentEntities = await this.paymentRepository.findOneBy({
      id: paymentId,
    });
    return paymentEntities;
  }

  async insertOne(payment: IPayment): Promise<PaymentEntity | null> {
    const paymentEntity = await this.paymentRepository.save(payment);
    return paymentEntity;
  }
}
