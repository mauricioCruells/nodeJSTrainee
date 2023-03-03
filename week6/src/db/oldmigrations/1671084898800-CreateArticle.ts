import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticle1671084898800
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'article',
        columns: [
          {
            name: 'article_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'url', type: 'varchar' },
          { name: 'type', type: 'varchar' },
          { name: 'author', type: 'varchar' },
          { name: 'section', type: 'varchar' },
          { name: 'publish_date', type: 'timestamp' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('article');
  }
}
