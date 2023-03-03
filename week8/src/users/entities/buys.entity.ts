import { Movie } from '../../movies/entities/movie.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'bought_movies' })
export class Buys {
  @PrimaryGeneratedColumn({ name: 'buy_id' })
  buyId: number;

  @CreateDateColumn({ name: 'sold_at' })
  soldAt: Date;

  @ManyToOne(() => User, (user) => user.buys)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @ManyToOne(() => Movie, (movie) => movie.buys)
  @JoinColumn({ name: 'movie_id' })
  public movie!: Movie;
}
