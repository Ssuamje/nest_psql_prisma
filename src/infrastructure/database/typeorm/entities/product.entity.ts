import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserProduct } from '@/infrastructure/database/typeorm/entities/user-product.entity';

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @Column({
    type: 'enum',
    enum: Visibility,
    default: Visibility.PUBLIC,
  })
  visibility: Visibility;

  @Column({ nullable: true })
  display_sequence?: number;

  @Column({ nullable: true })
  display_version?: string;

  @Column({ nullable: true })
  display_language?: string;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @OneToMany(() => UserProduct, (userProduct) => userProduct.product)
  userProducts: UserProduct[];
}
