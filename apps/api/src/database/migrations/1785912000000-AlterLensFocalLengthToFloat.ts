import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterLensFocalLengthToFloat1785912000000 implements MigrationInterface {
  name = 'AlterLensFocalLengthToFloat1785912000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lens_model" ALTER COLUMN "focalLength" TYPE double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lens_model" ALTER COLUMN "focalLength" TYPE integer USING ROUND("focalLength")::integer`,
    );
  }
}
