import {IsEnum, IsNumber, IsString} from 'class-validator'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {SubscriptionDurationEnum} from '../enums/SubscriptionDurationEnum'

@Entity({name: 'Subscription'})
export class SubscriptionEntity extends BaseEntity {
  static readonly TABLE = 'Subscription'
  @PrimaryGeneratedColumn()
  id: number

  @IsNumber()
  @Column({name: 'price'})
  price: number

  @IsString()
  @Column({name: 'product_id', nullable: false})
  productId: string

  @IsEnum(SubscriptionDurationEnum)
  @Column({name: 'duration', nullable: false})
  duration: SubscriptionDurationEnum
}
