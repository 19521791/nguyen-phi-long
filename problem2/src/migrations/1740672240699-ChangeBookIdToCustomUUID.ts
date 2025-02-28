import { MigrationInterface, QueryRunner } from "typeorm";
import { generateCustomId } from "@utils/generateId";

export class ChangeBookIdToCustomUUID1740672240699 implements MigrationInterface {
    name = 'ChangeBookIdToCustomUUID1740672240699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "new_id" varchar(8) DEFAULT 'TEMP'`);
    
        const books = await queryRunner.query(`SELECT id FROM "books"`);
        for (const book of books) {
          const newId = generateCustomId();
          await queryRunner.query(`UPDATE "books" SET "new_id" = $1 WHERE id = $2`, [newId, book.id]);
        }
    
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "new_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "id" SET NOT NULL`);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("Rollback migration");
      }

}
