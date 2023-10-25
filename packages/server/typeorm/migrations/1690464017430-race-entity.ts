import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RaceEntity1690464017430 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'race',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                ],
            })
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('race', true, true, true);
    }
}
