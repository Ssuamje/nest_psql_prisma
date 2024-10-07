import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { App } from './app.entity';
import { UserProduct } from '@/infrastructure/database/typeorm/entities/user-product.entity';

@Entity('app_user_products')
export class AppUserProduct {
  @PrimaryColumn('uuid')
  app_id: string;

  @PrimaryColumn('uuid')
  user_product_id: string;

  @ManyToOne(() => App, (app) => app.appUserProducts)
  app: App;

  @ManyToOne(() => UserProduct, (userProduct) => userProduct.appUserProducts)
  userProduct: UserProduct;

  @Column()
  sequence: number;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;
}
