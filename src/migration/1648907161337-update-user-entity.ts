import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserEntity1648907161337 implements MigrationInterface {
    name = 'updateUserEntity1648907161337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lasst_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`first_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`age\` int UNSIGNED NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lasst_name\``);
    }

}
