import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  article_id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ unique: true })
  url: string;

  @Column({ nullable: true })
  publish_date: Date;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  section: string;
}
