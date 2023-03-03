import { Movie } from '../../movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'rentals' })
export class Rentals {
  @PrimaryGeneratedColumn({ name: 'rental_id' })
  rentalId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'return_date', type: 'date' })
  returnDate: Date;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ManyToOne(() => Movie, (movie) => movie.rentals)
  @JoinColumn({ name: 'movie_id' })
  public movie!: Movie;
}
