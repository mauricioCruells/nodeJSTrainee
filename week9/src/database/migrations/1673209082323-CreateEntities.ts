import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1673209082323
  implements MigrationInterface
{
  name = 'CreateEntities1673209082323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tags" (
                "tag_id" SERIAL NOT NULL,
                "genre" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fc51a5be4c3e73cfc0146824cdd" UNIQUE ("genre"),
                CONSTRAINT "PK_06a35221325edeb80ad2ec1ff85" PRIMARY KEY ("tag_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "bought_movies" (
                "buy_id" SERIAL NOT NULL,
                "sold_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                "movie_id" integer,
                CONSTRAINT "PK_de817a5f52dc5f8a8fb55a7bd28" PRIMARY KEY ("buy_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "is_logged_in" boolean NOT NULL DEFAULT false,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'client',
                "last_login" TIMESTAMP NOT NULL DEFAULT now(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "rentals" (
                "rental_id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "return_date" date NOT NULL,
                "user_id" integer,
                "movie_id" integer,
                CONSTRAINT "PK_9ceff8cf58c6fab2551a44cf9b2" PRIMARY KEY ("rental_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "movies" (
                "movie_id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "poster" character varying NOT NULL,
                "stock" integer NOT NULL,
                "trailer" character varying NOT NULL,
                "sale_price" double precision NOT NULL,
                "likes" integer NOT NULL,
                "availability" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_5aa0bbd146c0082d3fc5a0ad5d8" UNIQUE ("title"),
                CONSTRAINT "PK_41acfcc57bc2330d74529a9a69b" PRIMARY KEY ("movie_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "movie_tags" (
                "moviesMovieId" integer NOT NULL,
                "tagsTagId" integer NOT NULL,
                CONSTRAINT "PK_deab4c99deee4602cc1daf27c19" PRIMARY KEY ("moviesMovieId", "tagsTagId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ed1f6bc4012f7f177f3dcd9d59" ON "movie_tags" ("moviesMovieId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ae215a0a1184b6d8af8053541f" ON "movie_tags" ("tagsTagId")
        `);
    await queryRunner.query(`
            ALTER TABLE "bought_movies"
            ADD CONSTRAINT "FK_7f4b68749747af675fd9fd78c4c" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "bought_movies"
            ADD CONSTRAINT "FK_f8992b2349ca339edc77b5ec833" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "rentals"
            ADD CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "rentals"
            ADD CONSTRAINT "FK_7372273411fbd72af2e7a3d166c" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "movie_tags"
            ADD CONSTRAINT "FK_ed1f6bc4012f7f177f3dcd9d59f" FOREIGN KEY ("moviesMovieId") REFERENCES "movies"("movie_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "movie_tags"
            ADD CONSTRAINT "FK_ae215a0a1184b6d8af8053541f6" FOREIGN KEY ("tagsTagId") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "movie_tags" DROP CONSTRAINT "FK_ae215a0a1184b6d8af8053541f6"
        `);
    await queryRunner.query(`
            ALTER TABLE "movie_tags" DROP CONSTRAINT "FK_ed1f6bc4012f7f177f3dcd9d59f"
        `);
    await queryRunner.query(`
            ALTER TABLE "rentals" DROP CONSTRAINT "FK_7372273411fbd72af2e7a3d166c"
        `);
    await queryRunner.query(`
            ALTER TABLE "rentals" DROP CONSTRAINT "FK_b13ac8580bd6a011f47a476fbad"
        `);
    await queryRunner.query(`
            ALTER TABLE "bought_movies" DROP CONSTRAINT "FK_f8992b2349ca339edc77b5ec833"
        `);
    await queryRunner.query(`
            ALTER TABLE "bought_movies" DROP CONSTRAINT "FK_7f4b68749747af675fd9fd78c4c"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_ae215a0a1184b6d8af8053541f"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_ed1f6bc4012f7f177f3dcd9d59"
        `);
    await queryRunner.query(`
            DROP TABLE "movie_tags"
        `);
    await queryRunner.query(`
            DROP TABLE "movies"
        `);
    await queryRunner.query(`
            DROP TABLE "rentals"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "bought_movies"
        `);
    await queryRunner.query(`
            DROP TABLE "tags"
        `);
  }
}
