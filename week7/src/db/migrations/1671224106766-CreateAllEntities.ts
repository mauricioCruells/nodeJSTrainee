import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllEntities1671224106766
  implements MigrationInterface
{
  name = 'CreateAllEntities1671224106766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "article" ("article_id" SERIAL NOT NULL, "title" character varying, "url" character varying NOT NULL, "publish_date" TIMESTAMP, "type" character varying, "author" character varying, "section" character varying, CONSTRAINT "PK_962ab3ae47140b8d85c11cb84ab" PRIMARY KEY ("article_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news_user" ("user_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_32acd964d9f8843eae7ff869c28" UNIQUE ("email"), CONSTRAINT "PK_6b1e711ded7ce139553c5e32e6e" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("user_id" integer NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "is_logged_in" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "password" character varying NOT NULL, "last_login" TIMESTAMP NOT NULL DEFAULT now(), "last_pwd_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"), CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE ("user_id"), CONSTRAINT "PK_efef1e5fdbe318a379c06678c51" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news_user_articles_article" ("newsUserUserId" integer NOT NULL, "articleArticleId" integer NOT NULL, CONSTRAINT "PK_da208d4989fdc05cb0481117af4" PRIMARY KEY ("newsUserUserId", "articleArticleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_82ed5c476ba40d5c58fd553b5b" ON "news_user_articles_article" ("newsUserUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_90889239130286d54b03f8cdf5" ON "news_user_articles_article" ("articleArticleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "news_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_user_articles_article" ADD CONSTRAINT "FK_82ed5c476ba40d5c58fd553b5b6" FOREIGN KEY ("newsUserUserId") REFERENCES "news_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_user_articles_article" ADD CONSTRAINT "FK_90889239130286d54b03f8cdf58" FOREIGN KEY ("articleArticleId") REFERENCES "article"("article_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news_user_articles_article" DROP CONSTRAINT "FK_90889239130286d54b03f8cdf58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news_user_articles_article" DROP CONSTRAINT "FK_82ed5c476ba40d5c58fd553b5b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_90889239130286d54b03f8cdf5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_82ed5c476ba40d5c58fd553b5b"`,
    );
    await queryRunner.query(
      `DROP TABLE "news_user_articles_article"`,
    );
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "news_user"`);
    await queryRunner.query(`DROP TABLE "article"`);
  }
}
