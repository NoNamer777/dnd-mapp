import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserRole1698418398919 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Role',
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
            }),
            true,
            true,
            true
        );

        await queryRunner.query("INSERT INTO Role (name) VALUES ('Player');");
        await queryRunner.query(`INSERT INTO Role (name) VALUES ('Admin');`);
        await queryRunner.query(`INSERT INTO Role (name) VALUES ('Dungeon Master');`);

        await queryRunner.createTable(
            new Table({
                name: 'UserRole',
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
                        referencedTableName: 'User',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['role_id'],
                        referencedTableName: 'Role',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT',
                    },
                ],
            }),
            true,
            true,
            true
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('UserRole', true, true, true);
        await queryRunner.dropTable('Role', true, true, true);
    }
}
