import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Product,
  Visibility,
} from '@/infrastructure/database/typeorm/entities/product.entity';
import { User } from '@/infrastructure/database/typeorm/entities/user.entity';
import { AppUserProduct } from '@/infrastructure/database/typeorm/entities/app-user-product.entity';

@Entity('user_products')
export class UserProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.userProducts)
  product: Product;

  @Column()
  product_id: string;

  @ManyToOne(() => User, (user) => user.userProducts)
  owner: User;

  @Column()
  owner_id: string;

  @Column({
    type: 'enum',
    enum: Visibility,
    default: Visibility.PRIVATE,
  })
  visibility: Visibility;

  @Column({ type: 'jsonb' })
  metadata: any;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @OneToMany(
    () => AppUserProduct,
    (appUserProduct) => appUserProduct.userProduct,
  )
  appUserProducts: AppUserProduct[];
}
