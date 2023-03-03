import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Buys } from './buys.entity';
import { Rentals } from './rentals.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'is_logged_in', default: false })
  isLoggedIn: boolean;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: string;

  @Column({
    name: 'last_login',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastLogin: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => Rentals, (rentals) => rentals.user, {
    cascade: true,
  })
  public rentals!: Rentals[];

  @OneToMany(() => Buys, (buys) => buys.user, {
    cascade: true,
  })
  public buys!: Buys[];
}
