import {DEFAULT_DATA_SOURCE} from '@modules/mysql/constants/database.constants'
import {Inject, Injectable} from '@nestjs/common'
import {DataSource, Repository} from 'typeorm'
import {BaseRepository} from '@modules/mysql/repository/BaseRepository'
import {SubscriptionEntity} from '../entities/Subscription.entity'
import {ISubscription} from '../types/ISubscription'
export const subscriptionRepositoryProvider = {
  provide: 'SUBSCRIPTION_REPOSITORY',
  useFactory: (dataSource: DataSource): Repository<SubscriptionEntity> =>
    dataSource.getRepository(SubscriptionEntity),
  inject: [DEFAULT_DATA_SOURCE],
}

@Injectable()
export class SubscriptionRepository extends BaseRepository<SubscriptionEntity> {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {
    super(subscriptionRepository)
  }

  async findById(subscriptionId: number): Promise<SubscriptionEntity | null> {
    const subscriptionEntities = await this.subscriptionRepository.findOneBy({
      id: subscriptionId,
    })
    return subscriptionEntities
  }

  async insertOne(
    subscription: ISubscription,
  ): Promise<SubscriptionEntity | null> {
    const subscriptionEntity = await this.subscriptionRepository.save(
      subscription,
    )
    return subscriptionEntity
  }
}
