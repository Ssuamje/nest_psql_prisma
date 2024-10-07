import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '@/infrastructure/database/typeorm/entities/device.entity';
import { User } from '@/infrastructure/database/typeorm/entities/user.entity';
import { AppUserProduct } from '@/infrastructure/database/typeorm/entities/app-user-product.entity';

export enum AppType {
  USEFUL = 'useful',
  DISTURBING = 'disturbing',
}

@Entity('apps')
export class App extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Device, (device) => device.apps, { nullable: true })
  device?: Device;

  @Column({ nullable: true })
  device_id?: string;

  @ManyToOne(() => User, (user) => user.apps, { nullable: true })
  user?: User;

  @Column({ nullable: true })
  user_id?: string;

  @Column({
    type: 'enum',
    enum: AppType,
    default: AppType.DISTURBING,
  })
  type: AppType;

  @Column()
  token: string;

  @Column({ nullable: true })
  bundleId?: string;

  @Column({ nullable: true })
  displayName?: string;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @OneToMany(() => AppUserProduct, (appUserProduct) => appUserProduct.app)
  appUserProducts: AppUserProduct[];
}
