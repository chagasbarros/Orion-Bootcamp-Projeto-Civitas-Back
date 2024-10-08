import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ModelDataBase1728390448734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'idUser',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '255'
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'idRole',
            type: 'int',
            isNullable: false
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
