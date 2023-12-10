import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientEntity1700125921270 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'client',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        width: 32,
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true,
                    },
                ],
            })
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('client', true, true, true);
    }
}
