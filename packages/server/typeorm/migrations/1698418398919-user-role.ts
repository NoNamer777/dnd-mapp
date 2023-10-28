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

        await queryRunner.createTable(
            new Table({
                name: 'user_role',
                columns: [
                    {
                        name: 'user_id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: false,
                    },
                    {
                        name: 'role_id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['user_id'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                    },
                    {
                        columnNames: ['role_id'],
                        referencedTableName: 'role',
                        referencedColumnNames: ['id'],
                    },
                ],
            })
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_role', true, true, true);
        await queryRunner.dropTable('role', true, true, true);
    }
}
