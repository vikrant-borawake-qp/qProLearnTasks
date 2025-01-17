import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../entities/Subscription.entity';
import { ISubscription } from '../types/ISubscription';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SubscriptionRepository extends SubscriptionEntity {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async findById(subscriptionId: number): Promise<SubscriptionEntity | null> {
    const subscriptionEntities = await this.subscriptionRepository.findOneBy({
      id: subscriptionId,
    });
    return subscriptionEntities;
  }

  async insertOne(
    subscription: ISubscription,
  ): Promise<SubscriptionEntity | null> {
    const subscriptionEntity =
      await this.subscriptionRepository.save(subscription);
    return subscriptionEntity;
  }
}
