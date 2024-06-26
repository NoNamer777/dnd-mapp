import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SkillEntity1690464526450 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'Skill',
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
                    {
                        name: 'ability_id',
                        type: 'integer',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['ability_id'],
                        referencedTableName: 'ability',
                        referencedColumnNames: ['id'],
                    },
                ],
            }),
            true,
            true,
            true
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('Skill', true, true, true);
    }
}
