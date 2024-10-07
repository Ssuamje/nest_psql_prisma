import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '@/infrastructure/database/typeorm/entities/user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('user_preferences')
export class UserPreference {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.userPreference)
  @JoinColumn({ name: 'id' })
  user: User;

  @Column({ nullable: true })
  birthday?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ nullable: true })
  goal?: string;

  @Column({ nullable: true })
  daily_usage?: number;

  @Column({ nullable: true })
  disturbs?: string;

  @Column({ default: '08_00' })
  wakeup_time: string;

  @Column({ default: '24_00' })
  asleep_time: string;

  @Column({ type: 'timestamptz', nullable: true })
  deleted_at?: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @Column({ type: 'timestamptz' })
  created_at: Date;
}
