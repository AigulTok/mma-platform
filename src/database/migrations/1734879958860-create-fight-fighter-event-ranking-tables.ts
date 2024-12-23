import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFightFighterEventRankingTables1734879958860 implements MigrationInterface {
    name = 'CreateFightFighterEventRankingTables1734879958860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fight" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "weight_class" character varying NOT NULL, "rounds" integer NOT NULL DEFAULT '3', "method" character varying, "eventId" uuid, "fighter1Id" uuid, "fighter2Id" uuid, "winnerId" uuid, CONSTRAINT "PK_c6ddb4bcedc3415b9f1b9d07b06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fighter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nickname" character varying, "weight_class" character varying NOT NULL, "team" character varying, "nationality" character varying, "wins" integer NOT NULL DEFAULT '0', "losses" integer NOT NULL DEFAULT '0', "knockouts" integer NOT NULL DEFAULT '0', "submissions" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2719a8a2de10cfa27adde3f15db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ranking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "weight_class" character varying NOT NULL, "rank" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fighterId" uuid, CONSTRAINT "PK_bf82b8f271e50232e6a3fcb09a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_5b977841fa5df7809fede4adb2b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_2de71cc862710b86b748c517df0" FOREIGN KEY ("fighter1Id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_4664ae59ee7c3a84b085fd16472" FOREIGN KEY ("fighter2Id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_bafc71189768827955608067eb9" FOREIGN KEY ("winnerId") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD CONSTRAINT "FK_f882b9a53f25d1c8e5fe67ab346" FOREIGN KEY ("fighterId") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP CONSTRAINT "FK_f882b9a53f25d1c8e5fe67ab346"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_bafc71189768827955608067eb9"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_4664ae59ee7c3a84b085fd16472"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_2de71cc862710b86b748c517df0"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_5b977841fa5df7809fede4adb2b"`);
        await queryRunner.query(`DROP TABLE "ranking"`);
        await queryRunner.query(`DROP TABLE "fighter"`);
        await queryRunner.query(`DROP TABLE "fight"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
