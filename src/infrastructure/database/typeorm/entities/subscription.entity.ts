import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/infrastructure/database/typeorm/entities/user.entity';

export enum SubscriptionPayment {
  PAID = 'paid',
  TRIAL = 'trial',
  REDEEM = 'redeem',
}

export enum SubscriptionStore {
  APPSTORE = 'appstore',
  PLAYSTORE = 'playstore',
  INHOUSE = 'inhouse',
}

export enum SubscriptionType {
  PERIOD = 'period',
  LIFETIME = 'lifetime',
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.subscriptions, { nullable: true })
  user?: User;

  @Column({ nullable: true })
  user_id?: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStore,
  })
  store: SubscriptionStore;

  @Column()
  transaction_id: string;

  @Column({
    type: 'enum',
    enum: SubscriptionPayment,
  })
  payment_method: SubscriptionPayment;

  @Column()
  payment_currency: string;

  @Column()
  payment_price: string;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
  })
  type: SubscriptionType;

  @Column()
  sku: string;

  @Column()
  period: string;

  @Column({ type: 'timestamptz' })
  purchased_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  valid_through?: Date;

  @Column({ type: 'jsonb' })
  metadata: any;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;
}
