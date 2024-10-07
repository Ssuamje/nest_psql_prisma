import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/infrastructure/database/typeorm/entities/user.entity';
import { App } from '@/infrastructure/database/typeorm/entities/app.entity';

export enum OSType {
  ANDROID = 'android',
  IOS = 'ios',
}

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.devices, { nullable: true })
  user?: User;

  @Column({ nullable: true })
  user_id?: string;

  @Column()
  device_type: string;

  @Column({
    type: 'enum',
    enum: OSType,
  })
  os_type: OSType;

  @Column()
  os_version: string;

  @Column()
  app_version: string;

  @Column({ nullable: true })
  fcm_token?: string;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  // Relations
  @OneToMany(() => App, (app) => app.device)
  apps: App[];
}
