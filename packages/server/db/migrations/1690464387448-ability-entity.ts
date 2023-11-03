import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AbilityEntity1690464387448 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'ability',
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
        await queryRunner.dropTable('ability', true, true, true);
    }
}
