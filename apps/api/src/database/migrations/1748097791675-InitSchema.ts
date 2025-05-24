import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1748097791675 implements MigrationInterface {
    name = 'InitSchema1748097791675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image_model" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "order" integer NOT NULL DEFAULT '0', "type" character varying NOT NULL, "path" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_05aa8703890985ec0bb38428699" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "camera_model" ("id" SERIAL NOT NULL, "interface" character varying NOT NULL, "type" character varying NOT NULL, "color" character varying NOT NULL, "maker" character varying NOT NULL, "resolutionX" integer NOT NULL, "resolutionY" integer NOT NULL, "speed" integer NOT NULL, "pixelSize" integer NOT NULL, "formatSize" character varying NOT NULL, "mountType" character varying NOT NULL, "sensor" character varying NOT NULL, "productId" integer, CONSTRAINT "REL_6fbf23b3b01146541327edeae8" UNIQUE ("productId"), CONSTRAINT "PK_3bab291fe6ce6e05556ab35fea9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lens_model" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "mount" character varying NOT NULL, "maker" character varying NOT NULL, "resolution" double precision NOT NULL, "numericAperture" character varying NOT NULL, "fNumnber" character varying NOT NULL, "focalLength" integer NOT NULL, "formatSize" double precision NOT NULL, CONSTRAINT "PK_a0e72d6634ae715469a875b5fba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "frame_grabber_model" ("id" SERIAL NOT NULL, "maker" character varying NOT NULL, "interface" character varying NOT NULL, "pcSlot" character varying NOT NULL, "connector" character varying NOT NULL, "memory" integer NOT NULL, CONSTRAINT "PK_75665fda06ac68c5815e9ec3b28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_model" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "company" character varying NOT NULL, "email" character varying NOT NULL, "subject" character varying NOT NULL, "message" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6b9fd594f2a5b8d16997f6ba1cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session_model" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "adminId" integer, CONSTRAINT "REL_d54ea2f31d374919742aae9e42" UNIQUE ("adminId"), CONSTRAINT "PK_3c8671916fb700dcbc8128a8768" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin_model" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "role" character varying NOT NULL DEFAULT 'ADMIN', "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_75de72b8ae709cfc9e859d93b44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "log_model" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "action" character varying NOT NULL, "productId" integer, "contactId" integer, "adminId" integer, CONSTRAINT "REL_2089cc260546fa1dacc359f3e3" UNIQUE ("productId"), CONSTRAINT "REL_9c0403b97587bd74689011cb69" UNIQUE ("contactId"), CONSTRAINT "REL_1184dda782aaa6d9dacf5542f7" UNIQUE ("adminId"), CONSTRAINT "PK_4732a2384f2aef36f9eb39eb190" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_model" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "categories" character varying NOT NULL, "name" character varying(50) NOT NULL, "mainFeature" text NOT NULL, "datasheetUrl" character varying NOT NULL, "drawingUrl" character varying NOT NULL, "manualUrl" character varying NOT NULL, CONSTRAINT "UQ_ba4f7f2ef775d3c902ed5dddaf5" UNIQUE ("name"), CONSTRAINT "PK_deef06ea1075a8678683d25c718" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "software_model" ("id" SERIAL NOT NULL, "maker" character varying NOT NULL, CONSTRAINT "PK_0df0f7cb3f1f81b0906e2101739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_model" ADD CONSTRAINT "FK_ab871d6d0eae35b15a7af0de4c1" FOREIGN KEY ("productId") REFERENCES "product_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "camera_model" ADD CONSTRAINT "FK_6fbf23b3b01146541327edeae8e" FOREIGN KEY ("productId") REFERENCES "product_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_model" ADD CONSTRAINT "FK_d54ea2f31d374919742aae9e42d" FOREIGN KEY ("adminId") REFERENCES "admin_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log_model" ADD CONSTRAINT "FK_2089cc260546fa1dacc359f3e35" FOREIGN KEY ("productId") REFERENCES "product_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log_model" ADD CONSTRAINT "FK_9c0403b97587bd74689011cb69d" FOREIGN KEY ("contactId") REFERENCES "contact_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log_model" ADD CONSTRAINT "FK_1184dda782aaa6d9dacf5542f7a" FOREIGN KEY ("adminId") REFERENCES "admin_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log_model" DROP CONSTRAINT "FK_1184dda782aaa6d9dacf5542f7a"`);
        await queryRunner.query(`ALTER TABLE "log_model" DROP CONSTRAINT "FK_9c0403b97587bd74689011cb69d"`);
        await queryRunner.query(`ALTER TABLE "log_model" DROP CONSTRAINT "FK_2089cc260546fa1dacc359f3e35"`);
        await queryRunner.query(`ALTER TABLE "session_model" DROP CONSTRAINT "FK_d54ea2f31d374919742aae9e42d"`);
        await queryRunner.query(`ALTER TABLE "camera_model" DROP CONSTRAINT "FK_6fbf23b3b01146541327edeae8e"`);
        await queryRunner.query(`ALTER TABLE "image_model" DROP CONSTRAINT "FK_ab871d6d0eae35b15a7af0de4c1"`);
        await queryRunner.query(`DROP TABLE "software_model"`);
        await queryRunner.query(`DROP TABLE "product_model"`);
        await queryRunner.query(`DROP TABLE "log_model"`);
        await queryRunner.query(`DROP TABLE "admin_model"`);
        await queryRunner.query(`DROP TABLE "session_model"`);
        await queryRunner.query(`DROP TABLE "contact_model"`);
        await queryRunner.query(`DROP TABLE "frame_grabber_model"`);
        await queryRunner.query(`DROP TABLE "lens_model"`);
        await queryRunner.query(`DROP TABLE "camera_model"`);
        await queryRunner.query(`DROP TABLE "image_model"`);
    }

}
