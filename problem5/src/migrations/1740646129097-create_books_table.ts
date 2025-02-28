import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBooksTable1740646129097 implements MigrationInterface {
    name = 'CreateBooksTable1740646129097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "author" character varying(255) NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "rating" double precision, "stock" boolean, "thumbnail" character varying(255), "title" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
