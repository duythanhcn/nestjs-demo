import {MigrationInterface, QueryRunner} from "typeorm";

export class init1648798628703 implements MigrationInterface {
    name = 'init1648798628703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`access_token\` varchar(255) NULL, \`refresh_token\` varchar(255) NULL, UNIQUE INDEX \`IDX_074a1f262efaca6aba16f7ed92\` (\`user_name\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_074a1f262efaca6aba16f7ed92\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
