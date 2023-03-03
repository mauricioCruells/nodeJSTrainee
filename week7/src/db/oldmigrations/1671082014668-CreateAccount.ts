import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAccount1671082014668
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          { name: 'user_id', type: 'int', isPrimary: true },
          { name: 'role', type: 'varchar' },
          { name: 'is_logged_in', type: 'bool' },
          { name: 'username', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'last_login', type: 'timestamp' },
          { name: 'last_pwd_update', type: 'timestamp' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'account',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'news_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account');
  }
}
