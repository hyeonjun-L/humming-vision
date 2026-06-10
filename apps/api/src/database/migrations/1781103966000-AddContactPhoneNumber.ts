import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactPhoneNumber1781103966000 implements MigrationInterface {
  name = 'AddContactPhoneNumber1781103966000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_model" ADD "phoneNumber" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_model" DROP COLUMN "phoneNumber"`,
    );
  }
}
