import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Rentals } from '../../users/entities/rentals.entity';
import { Buys } from '../../users/entities/buys.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn({ name: 'movie_id' })
  movieId: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  poster: string;

  @Column()
  stock: number;

  @Column()
  trailer: string;

  @Column({ name: 'sale_price', type: 'float' })
  salePrice: number;

  @Column()
  likes: number;

  @Column()
  availability: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'movie_tags' })
  tags: Tag[];

  @OneToMany(() => Rentals, (rentals) => rentals.movie, {
    cascade: true,
  })
  public rentals!: Rentals[];

  @OneToMany(() => Buys, (buys) => buys.movie, {
    cascade: true,
  })
  public buys!: Buys[];
}
