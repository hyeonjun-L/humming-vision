import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableToContact1755096687993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_model" ALTER COLUMN "company" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_model" ALTER COLUMN "subject" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_model" ALTER COLUMN "company" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_model" ALTER COLUMN "subject" SET NOT NULL`,
    );
  }
}
