import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTokens1705841437407 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'Token',
                columns: [
                    {
                        name: 'jti',
                        type: 'varchar',
                        width: 32,
                        isPrimary: true,
                        primaryKeyConstraintName: 'pk_token',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        width: 16,
                        isNullable: false,
                    },
                    {
                        name: 'subject',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'client_id',
                        type: 'varchar',
                        width: 16,
                        isNullable: false,
                    },
                    {
                        name: 'revoked',
                        type: 'tinyint',
                        width: 1,
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'not_before',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'issued_at',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'expires_at',
                        type: 'datetime',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fk_user_token',
                        columnNames: ['subject'],
                        referencedTableName: 'User',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'fk_client_token',
                        columnNames: ['client_id'],
                        referencedTableName: 'Client',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
            true,
            true,
            true
        );
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('Token', true, true, true);
    }
}
