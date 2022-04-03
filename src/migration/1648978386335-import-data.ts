import { MigrationInterface, QueryRunner } from 'typeorm';

export class importData1648978386335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO permissions (permission_id,permission_name) VALUES(1,'CREATE'),(2,'DELETE'),(3,'UPDATE'),(4,'LIST')`,
    );
    await queryRunner.query(
      `INSERT INTO roles (role_id,role_name) VALUES(1,'ADMIN'),(2,'USER'),(3,'GUEST')`,
    );
    await queryRunner.query(
      `INSERT INTO \`roles-permissions\` (role_id,permission_id) VALUES(1,1),(1,2),(1,3),(2,3),(1,4), (2,4), (3,4)`,
    );
    await queryRunner.query(
      `INSERT INTO users(user_name, password, access_token, refresh_token, lasst_name, first_name, address, age, role_id) VALUES('ThanhLD', '11111111', null, null, 'Thanh', 'Le', 'HCM', 30, 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE users`);
    await queryRunner.query(`TRUNCATE TABLE \`roles-permissions\``);
    await queryRunner.query(`DELETE FROM roles WHERE 1=1`);
    await queryRunner.query(`DELETE FROM permissions WHERE 1=1`);
  }
}
