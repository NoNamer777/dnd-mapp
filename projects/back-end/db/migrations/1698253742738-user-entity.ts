import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserEntity1698253742738 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isNullable: false,
                        isUnique: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email_address',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            })
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('user', true, true, true);
    }
}
