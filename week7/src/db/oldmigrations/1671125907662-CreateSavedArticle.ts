import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSavedArticle1671125907662
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'saved_article',
        columns: [
          { name: 'user_id', type: 'int', isPrimary: true },
          { name: 'article_id', type: 'int', isPrimary: true },
          { name: 'saved_date', type: 'timestamp' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'saved_article',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'news_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'saved_article',
      new TableForeignKey({
        columnNames: ['article_id'],
        referencedColumnNames: ['article_id'],
        referencedTableName: 'article',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('saved_article');
  }
}
