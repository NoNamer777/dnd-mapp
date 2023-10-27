import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserRole1698418398919 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'role',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'enum',
                        enumName: 'roles',
                        enum: ['Admin', 'Player', 'Dungeon Master'],
                        isNullable: false,
                        isUnique: true,
                    },
                ],
            })
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role', true, true, true);
    }
}
