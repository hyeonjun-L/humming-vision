import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1759510576092 implements MigrationInterface {
  name = 'InitSchema1759510576092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_model" ADD "failedLoginAttempts" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin_model" DROP COLUMN "failedLoginAttempts"`,
    );
  }
}
