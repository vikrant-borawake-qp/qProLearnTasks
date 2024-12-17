import {SubscriptionDurationEnum} from '../enums/SubscriptionDurationEnum'

export interface ISubscription {
  price: number
  productId: string
  duration: SubscriptionDurationEnum
}
