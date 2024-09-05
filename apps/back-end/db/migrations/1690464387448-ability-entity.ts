import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AbilityEntity1690464387448 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'Ability',
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
            }),
            true,
            true,
            true
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('Ability', true, true, true);
    }
}
