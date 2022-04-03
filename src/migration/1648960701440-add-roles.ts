import {MigrationInterface, QueryRunner} from "typeorm";

export class addRoles1648960701440 implements MigrationInterface {
    name = 'addRoles1648960701440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`permission_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`permission_name\` enum ('CREATE', 'DELETE', 'UPDATE', 'LIST') NOT NULL, PRIMARY KEY (\`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`role_id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`role_name\` enum ('USER', 'ADMIN', 'GUEST') NOT NULL, PRIMARY KEY (\`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles-permissions\` (\`role_id\` int UNSIGNED NOT NULL, \`permission_id\` int UNSIGNED NOT NULL, PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role_id\` int UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`roles-permissions\` ADD CONSTRAINT \`FK_4180400f79a1ffa2521910d6e09\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`role_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles-permissions\` ADD CONSTRAINT \`FK_4219fe909a03e0110c6fab71f85\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`permission_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`role_id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`roles-permissions\` DROP FOREIGN KEY \`FK_4219fe909a03e0110c6fab71f85\``);
        await queryRunner.query(`ALTER TABLE \`roles-permissions\` DROP FOREIGN KEY \`FK_4180400f79a1ffa2521910d6e09\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`DROP TABLE \`roles-permissions\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
