const { Table } = require('typeorm');

module.exports = class raceTable1680607613515 {
    /** @param {QueryRunner} queryRunner */
    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: 'race',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.query(`INSERT INTO "race" ("name") VALUES ('Dwarf'), ('Elf');`);
    }

    /** @param {QueryRunner} queryRunner */
    async down(queryRunner) {
        await queryRunner.dropTable('race');
    }
};
