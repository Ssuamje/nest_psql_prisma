import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPreference } from '@/infrastructure/database/typeorm/entities/user-preferences.entity';
import { Device } from '@/infrastructure/database/typeorm/entities/device.entity';
import { App } from '@/infrastructure/database/typeorm/entities/app.entity';
import { UserProduct } from '@/infrastructure/database/typeorm/entities/user-product.entity';
import { Subscription } from '@/infrastructure/database/typeorm/entities/subscription.entity';

export enum UserRole {
  USER = 'user',
  INTERNAL = 'internal',
  ADMIN = 'admin',
}

export enum UserVendor {
  APPLE = 'apple',
  GOOGLE = 'google',
  KAKAO = 'kakao',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserVendor,
  })
  vendor: UserVendor;

  @Column({ unique: true })
  vendorId: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  locale: string;

  @Column()
  timezone: string;

  @Column({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @OneToOne(() => UserPreference, (preference) => preference.user)
  userPreference?: UserPreference;

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => App, (app) => app.user)
  apps: App[];

  @OneToMany(() => UserProduct, (userProduct) => userProduct.owner)
  userProducts: UserProduct[];

  constructor(
    role: UserRole,
    vendor: UserVendor,
    vendorId: string,
    nickname: string,
    email: string,
    locale: string,
    timezone: string,
    deleted_at: Date,
    updated_at: Date,
    created_at: Date,
  ) {
    super();
    this.role = role;
    this.vendor = vendor;
    this.vendorId = vendorId;
    this.nickname = nickname;
    this.email = email;
    this.locale = locale;
    this.timezone = timezone;
    this.deleted_at = deleted_at;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
