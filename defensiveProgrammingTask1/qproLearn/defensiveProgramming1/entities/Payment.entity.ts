import {IsBoolean, IsDate, IsEnum, IsNumber, IsString} from 'class-validator'
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {PaymentStatusEnum} from '../enums/PaymentStatusEnum'
import {PaymentModeEnum} from '../enums/PaymentModeEnum'

@Entity({name: 'Payment'})
export class PaymentEntity extends BaseEntity {
  static readonly TABLE = 'Payment'
  @PrimaryGeneratedColumn()
  id: number

  @IsNumber()
  @Column({name: 'amount', nullable: false})
  amount: number

  @IsString()
  @Column({name: 'user_id', nullable: false})
  userId: string

  @IsEnum(PaymentStatusEnum)
  @Column({name: 'status', nullable: false})
  status: PaymentStatusEnum

  @IsDate()
  @Column({name: 'payment_timestamp', nullable: false})
  paymentTimestamp: Date

  @IsBoolean()
  @Column({name: 'is_error', nullable: true})
  isError?: boolean

  @IsString()
  @Column({name: 'error_message', nullable: true})
  errorMessage?: string

  @IsEnum(PaymentModeEnum)
  @Column({name: 'payment_mode', nullable: false})
  paymentMode: PaymentModeEnum
}
