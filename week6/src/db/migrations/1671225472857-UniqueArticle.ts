import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueArticle1671225472857 implements MigrationInterface {
    name = 'UniqueArticle1671225472857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "UQ_b99fa71c07cc9a8421bd36bb1db" UNIQUE ("url")`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "UQ_efef1e5fdbe318a379c06678c51" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "news_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "UQ_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "news_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "UQ_b99fa71c07cc9a8421bd36bb1db"`);
    }

}
