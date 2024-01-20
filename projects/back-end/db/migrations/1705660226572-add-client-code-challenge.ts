import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddClientCodeChallenge1705660226572 implements MigrationInterface {
    async up(queryRunner: QueryRunner) {
        await queryRunner.addColumns('client', [
            new TableColumn({
                name: 'code_challenge',
                type: 'varchar',
                width: 255,
                isNullable: true,
                isUnique: true,
            }),
            new TableColumn({
                name: 'authorization_code',
                type: 'varchar',
                width: 255,
                isNullable: true,
                isUnique: true,
            }),
            new TableColumn({
                name: 'authorization_code_generated_at',
                type: 'datetime',
                isNullable: true,
            }),
        ]);
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropColumns('client', [
            'code_challenge',
            'authorization_code',
            'authorization_code_generated_at',
        ]);
    }
}
