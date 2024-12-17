import {DEFAULT_DATA_SOURCE} from '@modules/mysql/constants/database.constants'
import {Inject, Injectable} from '@nestjs/common'
import {DataSource, Repository} from 'typeorm'
import {BaseRepository} from '@modules/mysql/repository/BaseRepository'
import {PaymentEntity} from '../entities/Payment.entity'
import {IPayment} from '../types/IPayment'
export const paymentRepositoryProvider = {
  provide: 'PAYMENT_REPOSITORY',
  useFactory: (dataSource: DataSource): Repository<PaymentEntity> =>
    dataSource.getRepository(PaymentEntity),
  inject: [DEFAULT_DATA_SOURCE],
}

@Injectable()
export class PaymentRepository extends BaseRepository<PaymentEntity> {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private subscriptionRepository: Repository<PaymentEntity>,
  ) {
    super(subscriptionRepository)
  }

  async findById(subscriptionId: number): Promise<PaymentEntity | null> {
    const subscriptionEntities = await this.subscriptionRepository.findOneBy({
      id: subscriptionId,
    })
    return subscriptionEntities
  }

  async insertOne(payment: IPayment): Promise<PaymentEntity | null> {
    const subscriptionEntity = await this.subscriptionRepository.save(payment)
    return subscriptionEntity
  }
}
