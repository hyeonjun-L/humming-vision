import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1753362435381 implements MigrationInterface {
    name = 'InitSchema1753362435381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "camera_model" DROP COLUMN "pixelSize"`);
        await queryRunner.query(`ALTER TABLE "camera_model" ADD "pixelSize" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "camera_model" DROP COLUMN "pixelSize"`);
        await queryRunner.query(`ALTER TABLE "camera_model" ADD "pixelSize" integer NOT NULL`);
    }

}
