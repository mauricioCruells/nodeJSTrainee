import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNewsUser1671076995988
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'news_user',
        columns: [
          {
            name: 'user_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'first_name', type: 'varchar' },
          { name: 'last_name', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'created_at', type: 'timestamp' },
          { name: 'updated_at', type: 'timestamp' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('news_user');
  }
}
