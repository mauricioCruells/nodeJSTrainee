import 'reflect-metadata';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import NewsUser from '../../users/entities/news_user.entity';

@Entity()
export default class Account {
  @OneToOne(() => NewsUser, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @PrimaryColumn()
  user_id: NewsUser;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: false })
  is_logged_in: boolean;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_pwd_update: Date;
}
