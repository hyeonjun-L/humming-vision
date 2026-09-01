import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactPrivacyPolicyVersion1786000000000 implements MigrationInterface {
  name = 'AddContactPrivacyPolicyVersion1786000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_model" ADD "privacyPolicyVersion" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_model" DROP COLUMN "privacyPolicyVersion"`,
    );
  }
}
