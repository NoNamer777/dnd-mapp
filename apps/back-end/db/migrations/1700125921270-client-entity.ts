import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientEntity1700125921270 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'Client',
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
            }),
            true,
            true,
            true
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('Client', true, true, true);
    }
}
